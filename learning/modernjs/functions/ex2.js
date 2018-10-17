const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('assert');

const makeSum = () => {
  const sum = (val) => {
    sum.val = sum.val + val;
    return sum;
  };
  sum.val = 0;

  sum[Symbol.toPrimitive] = (hint) => {
    return sum.val;
  };
  return sum;
}

describe('sum', () => {
  it('does what it should', () => {
    let sum;
    sum = makeSum();
    assert.ok(sum(1)(2) == 3);
    sum = makeSum();
    assert.ok(sum(1)(2)(3) == 6);
    sum = makeSum();
    assert.ok(sum(5)(-1)(2) == 6);
    sum = makeSum();
    assert.ok(sum(6)(-1)(-2)(-3) == 0);
    sum = makeSum();
    assert.ok(sum(0)(1)(2)(3)(4)(5) == 15);
  });
});

