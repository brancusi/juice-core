import _ from 'lodash';

import {
  labelSort
} from 'juice-core/utils/sorting';

const buildCollection = (data, type, sortFunc) => {
  return _
    .map(data)

    // Selected the type: ingredient, recipe, product
    .filter(child => child.type === type)

    // Filter out empty collections
    .filter(child => child.factor > 0)

    // Sort it
    .sort(sortFunc)

    // Map the children?
    .map(child => child.tree)

    // Merge props at this level but sort children
    .map(tree => Object.assign({collection: tree.tree.sort(sortFunc)}, tree));
}

const buildPayload = async function (node, type, sort = labelSort) {
  const normalizedChildren = await node.get('normalizedChildren');
  return buildCollection(normalizedChildren, type, sort);
}

export default buildPayload;
