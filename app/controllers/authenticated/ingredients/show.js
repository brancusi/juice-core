import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    navigateTo(path) {
      this.transitionToRoute(path);
    },

    handleUpdate(model, key, val) {
      model.set(key, val);
      model.save();
    },

    async addUom(node, uoms) {
      node.set('forceUoms', uoms.join(','))
      node.save();
    },

    async removeUom(node, label) {
      const newArr = node.get('forceUomsParsed')
        .filter(uom => uom !== label);

      node.set('forceUoms', newArr.join(','))
      node.save();
    },

    async destroyNode(node) {
      const children = await node.get("children");
      const parents = await node.get("parents");

      children
        .forEach(async edge => {
          const b = await edge.get("b");
          edge.destroyRecord();
          b.save();
        });

      parents
        .forEach(async edge => {
          const a = await edge.get("a");
          edge.destroyRecord();
          a.save();
        });

      node.destroyRecord();

      this.transitionToRoute('authenticated.ingredients');
    }
  }
});
