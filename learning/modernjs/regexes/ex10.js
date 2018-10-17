const assert = require('assert');

let exprRe = /(-?\d+\.\d+|-?\d+)\s*?([+-\/\*])\s*?(-?\d+\.\d+|-?\d+)/;

function parse(expr) {
  expr = expr.trim();
  let res = expr.match(exprRe);
  return [res[1], res[2], res[3]];
}


describe('parse', function(){

  it('parses simplest case', () => {
    
    let [first, operator, second] = parse('1 + 5');
    assert.equal(first, 1);
    assert.equal(operator, '+');
    assert.equal(second, 5);
  });

  it('handles whitespace', () => {
    
    let [first, operator, second] = parse('  6 + 5   ');
    assert.equal(first, 6);
    assert.equal(operator, '+');
    assert.equal(second, 5);
  });

  it('handles negatives', () => {
    
    let [first, operator, second] = parse('1 + -5');
    assert.equal(first, 1);
    assert.equal(operator, '+');
    assert.equal(second, -5);
  });

  it('handles floats and negatives', () => {
    
    let [first, operator, second] = parse('-72.577 - -5.999');
    assert.equal(first, -72.577);
    assert.equal(operator, '-');
    assert.equal(second, -5.999);
  });



});
