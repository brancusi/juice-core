import Ember from 'ember';
import downloadFile from "juice-core/utils/download-file";

const {
  computed: {
    filterBy
  }
} = Ember;

export default Ember.Component.extend({
  products: filterBy('nodes', 'isProduct', true),
  pdfGenerator: Ember.inject.service(),

  actions: {
    async printAll() {
      const data = await this.get('model.normalizedChildren');
      const { url } = await this.get('pdfGenerator').generateFullPrepSheet(data);
      return downloadFile(url, 'mykey');
    }
  }
});
