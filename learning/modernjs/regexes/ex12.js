'use strict'
const assert = require('assert');

let reg = /\[(b|url|quote)\][\s\S]*\[\/\1\]/m;

describe('find bbtags', () => {

  it('simple', () => {
    let str = "..[url][b]http://google.com[/b][/url]..";
    let matches = str.match(reg);
    assert.equal(matches[0], '[url][b]http://google.com[/b][/url]');
  });

  it('more complex', () => {
    let str = `..[url]
[b]
http://google.com[/b][/url]...`;
    let matches = str.match(reg);
    assert.equal(matches[0], `[url]
[b]
http://google.com[/b][/url]`);
  });

});
