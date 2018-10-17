'use strict';

const assert = require('assert');

class Calculator {
  constructor(){
    this.operators = {'+': (a, b) => a + b,
                      '-': (a, b) => a - b,};
  }

  calculate(expr) {
    let [a, operator, b] = expr.split(' ');
    return this.operators[operator](parseInt(a), parseInt(b));
  }

  addMethod(operator, func) {
    this.operators[operator] = func;
  }
  
}

describe("Calculator", function() {
  let calculator;

  before(function() {
    calculator = new Calculator;
  });

  it("calculate(12 + 34) = 46", function() {
    assert.equal(calculator.calculate("12 + 34"), 46);
  });

  it("calculate(34 - 12) = 22", function() {
    assert.equal(calculator.calculate("34 - 12"), 22);
  });

  it("add multiplication: calculate(2 * 3) = 6", function() {
    calculator.addMethod("*", (a, b) => a * b);
    assert.equal(calculator.calculate("2 * 3"), 6);
  });

  it("add power: calculate(2 ** 3) = 8", function() {
    calculator.addMethod("**", (a, b) => a ** b);
    assert.equal(calculator.calculate("2 ** 3"), 8);
  });
});
