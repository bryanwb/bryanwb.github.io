'use strict'
const assert = require('assert');

let reg = /<style(>|\s.*?>)/g;

describe('find full tag', () => {

  it('simple', () => {
    let str = '<style> <styler> <style test="foobar">'
    let matches = str.match(reg);
    assert.equal(matches[0], '<style>');
    assert.equal(matches[1], '<style test="foobar">');
    assert.equal(matches.length, 2);
  });

});
