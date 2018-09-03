const fs = require('fs');
const path = require('path');

let buff = fs.readFileSync(path.resolve(__dirname, '../package.json'));
let str = buff.toString();
let lines = str.split('\n');
console.log(lines.length);
