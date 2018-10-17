'use strict';

const alert = console.log;

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [ john, pete, mary ];

function getAverageAge(anArr) {
  return anArr.reduce((sum, item) => sum += item.age, 0) / anArr.length;
}

alert( getAverageAge(arr) );
