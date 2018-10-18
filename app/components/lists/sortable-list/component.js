import Component from '@ember/component';
import { computed } from '@ember/object';

const {
  filterBy,
  notEmpty,
  sort
} = computed;

export default Component.extend({
  showInactive:     false,

  inactiveItems:    filterBy('model', 'isActive', false),
  hasInactiveItems: notEmpty('inactiveItems'),

  sortProps:        ['position'],
  sortedItems:      sort('model', 'sortProps'),

  activeItems: computed('sortedItems.@each.{isActive}', 'showInactive', function() {
    if(!this.get('showInactive')) {
      return this.get('sortedItems').filter(n => n.get('isActive'));
    }

    return this.get('sortedItems');
  }),

  actions: {
    sortEndAction() {
      this.get('activeItems')
        .forEach((item, index) => {
          item.set('position', index);
          item.save();
        })
    }
  }
});
