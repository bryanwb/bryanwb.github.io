'use strict';
const assert = require('assert');

function getMaxSubSum(nums) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of nums) {
    partialSum += item;
    maxSum = Math.max(maxSum, partialSum);
    if (partialSum < 0) partialSum = 0;
  }

  return maxSum;
}

describe("getMaxSubSum", function() {
  it("maximal subsum of [1, 2, 3] equals 6", function() {
    assert.equal(getMaxSubSum([1, 2, 3]), 6);
  });

  it("maximal subsum of [-1, 2, 3, -9] equals 5", function() {
    assert.equal(getMaxSubSum([-1, 2, 3, -9]), 5);
  });

  it("maximal subsum of [-1, 2, 3, -9, 11] equals 11", function() {
    assert.equal(getMaxSubSum([-1, 2, 3, -9, 11]), 11);
  });

  it("maximal subsum of [-2, -1, 1, 2] equals 3", function() {
    assert.equal(getMaxSubSum([-2, -1, 1, 2]), 3);
  });

  it("maximal subsum of [100, -9, 2, -3, 5] equals 100", function() {
    assert.equal(getMaxSubSum([100, -9, 2, -3, 5]), 100);
  });

  it("maximal subsum of [] equals 0", function() {
    assert.equal(getMaxSubSum([]), 0);
  });

  it("maximal subsum of [-1] equals 0", function() {
    assert.equal(getMaxSubSum([-1]), 0);
  });

  it("maximal subsum of [-1, -2] equals 0", function() {
    assert.equal(getMaxSubSum([-1, -2]), 0);
  });
});

