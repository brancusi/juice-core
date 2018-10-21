import Component from '@ember/component';
import { filterBy } from '@ember/object/computed';

export default Component.extend({
  ingredients: filterBy('model', 'type', 'ingredient')
});
