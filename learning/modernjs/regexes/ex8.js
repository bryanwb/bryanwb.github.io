const alert = console.log;
let reg = /(\b\d+\.?\d+\b|\d+)/g;

let str = "1.5 0 12. 123.4.";

alert( str.match(reg) ); 
