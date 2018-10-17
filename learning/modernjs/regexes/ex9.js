const alert = console.log;

let reg = /(\b-?\d+\.\d+\b|\b-?\d+\b)/g;

let str = "-1.5 0 2 -123.4.";

alert( str.match(reg) ); // -1.5, 0, 2, -123.4
