import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import fireBaseFixture from 'juice-core/tests/fixtures/firebase-default';

import {
  initAcceptanceTest
} from 'juice-core/tests/helpers/acceptance-helpers';

module('Acceptance | products', function(hooks) {
  initAcceptanceTest(hooks, fireBaseFixture);

  test('displays active products as default', async function (assert) {
    await visit('/a/products');

    assert.dom('[data-test-label-row-label]').exists({count: 1});
    assert.dom('[data-test-label-row-label]').hasText('Tasty Salad');
  });

  test('displays product information correctly', async function(assert) {
    await visit('/a/products/product-id1');

    assert.dom('[data-test-desc-input="input-node-name"]').hasValue('Tasty Salad');
    assert.dom('[data-test-desc-input="input-node-qty"]').hasValue('3');
    assert.dom('[data-test-node-active]').isChecked();

    assert.dom('[data-test-line-item-name]').hasText('Salty Sauce');
    assert.dom('[data-test-line-item-qty]').hasValue('4');
  });
});
