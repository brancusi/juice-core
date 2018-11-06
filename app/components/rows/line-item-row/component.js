import Component from '@ember/component';

export default Component.extend({
  didInsertElement() {
    let firstInput = this.get('element').querySelector("input");
    firstInput.focus();
    firstInput.select();
  }
});
