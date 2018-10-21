import Component from '@ember/component';
import { notEmpty, filterBy } from '@ember/object/computed';

export default Component.extend({
  classNameBindings: ['hasParents::hide'],

  hasParents:   notEmpty('model.parents'),
  recipes:      filterBy('model.parents', 'parentType', 'recipe'),
  products:     filterBy('model.parents', 'parentType', 'product')
});
