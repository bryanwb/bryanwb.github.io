'use strict';

const assert = require('assert');
const alert = console.log;

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ john, pete, mary ];

function _sort(a, b) {
  if (a.name > b.name) return 1;
  if (a.name === b.name) return 0;
  if (a.name < b.name) return -1;
}

function sortByName(arr) {
  arr.sort(_sort);
}

sortByName(arr);

// now: [john, mary, pete]
alert(arr[1].name); // Mary
