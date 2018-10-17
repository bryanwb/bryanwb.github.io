'use strict'
const assert = require('assert');

let quoteRe = /".*(\\\\"|[^\\]")/g;

describe('find quoted strings', () => {

  it('simple', () => {
    let str = '"test me".';
    let matches = str.match(quoteRe);
    assert.equal(matches[0], '"test me"');

    str = 'Just "like \\"here\\"."';
    matches = str.match(quoteRe);
    assert.equal(matches[0], '"like \\"here\\"."');
  });

  it('double slash inside', () => {
    let str = '"\\\\".';
    let matches = str.match(quoteRe);
    assert.equal(matches[0], '"\\\\"');
    
    str = 'foo "\\\\ \""';
    matches = str.match(quoteRe);
    assert.equal(matches[0], '"\\\\ ""');
  });

  it('no match', () => {
    let str = 'Just like \\"here\\".';
    let matches = str.match(quoteRe);
    assert.equal(matches, null);
  });

});
