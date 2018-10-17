const alert = console.log;
let reg = /#([a-z0-9]{6}|[a-z0-9]{3})\b/ig;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(reg) ); // #3f3 #AA0ef
