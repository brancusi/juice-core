import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import fireBaseFixture from 'juice-core/tests/fixtures/firebase-default';

import {
  initAcceptanceTest
} from 'juice-core/tests/helpers/acceptance-helpers';

module('Acceptance | recipes', function(hooks) {
  initAcceptanceTest(hooks, fireBaseFixture);

  hooks.beforeEach(async () => {
    await visit('/a/recipes');
  });

  test('displays active recipes as default', async function (assert) {
    assert.dom('[data-test-label-row]').hasText('Tomato Sauce');
  });

  test('displays recipe information correctly', async function(assert) {
    await click('[data-test-label-row]');

    assert.dom('[data-test-node-name]').hasValue('Tomato Sauce');
    assert.dom('[data-test-line-item-row] [data-test-label]').hasText('Salt');
    assert.dom('[data-test-edge-quantity] input').hasValue('7');
  });
});
