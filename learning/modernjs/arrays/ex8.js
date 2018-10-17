'use strict';

let arr = [1,2,3,4,5,6,7];

function shuffle(anArr) {
  anArr.forEach((item, index, array) => {
    let newPos = Math.round(Math.random() * (anArr.length - 1));
    let current = array[newPos];
    array[index] = current;
    array[newPos] = item;
  });
}

shuffle(arr);
console.log(arr);
shuffle(arr);
console.log(arr);
shuffle(arr);
console.log(arr);
