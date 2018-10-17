const assert = require('assert');

let reg = /(Java\b|JavaScript|PHP|C\+\+|C\b)/g;

describe('find programming languages', () => {
  it('simple', () => {
    let match = "Java JavaScript PHP C++ C".match(reg);
    let matches = match.slice(0);
    assert.deepEqual(matches, ['Java', 'JavaScript', 'PHP', 'C++', 'C']);
  });

});
