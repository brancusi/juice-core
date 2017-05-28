import Ember from 'ember';
import { unitTypes } from 'juice-core/constants/unit-conversions';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  uoms: unitTypes,

  validNodes: computed('model.@each.{type}', function() {
    const self = this.get('model');
    return this.get('nodes')
      .filter(n => !n.get('isProduct') && !n.get('isProduction'))
      .filter(n => n !== self);
  }),

  startCreateIngredient(name) {
    this.set('newIngredientUom', 'floz');
    this.set('newIngredientName', name);
    this.set('showCreateIngredient', true);
  },

  actions: {
    search(q, data) {
      const reg = new RegExp(q, "i");
      const matches = data.options.filter(n => reg.test(n.get('label')));

      if(Ember.isEmpty(matches)) {
        return [
          {
            label:`${q} not found, create it...`,
            stashedName: q,
            action:'createIngredient'
          }
        ]
      } else {
        return matches;
      }
    },

    cancelCreateIngredient() {
      this.set('showCreateIngredient', false);
    },

    createIngredient() {
      this.get('createAndAddNode')('ingredient', this.get('newIngredientName'), this.get('newIngredientUom'));
      this.set('showCreateIngredient', false);
    },

    handleSelect(option) {
      if(option.action === "createIngredient") {
        this.startCreateIngredient(option.stashedName);
      } else {
        this.get('addNode')(option);
      }
    }
  }
});
