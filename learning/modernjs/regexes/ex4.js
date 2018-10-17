const alert = console.log;
let reg = /(#[ABCDEFabcdef0-9]{6}\b)/g;

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";

alert( str.match(reg) )  // #121212,#AA00ef
