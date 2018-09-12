const fs = require('fs');

let points = JSON.parse(fs.readFileSync('src/data/BTC.json').toString());
points.forEach(d => d.date = new Date(+d.date));
console.log('hello!');
