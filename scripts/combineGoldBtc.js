const fs = require('fs');

let btc = JSON.parse(fs.readFileSync('src/data/BTC-normal.json').toString());
let gold = JSON.parse(fs.readFileSync('src/data/GOLD.json').toString());

let foundCount = 0;
let missingCount = 0;
let data = [];

for (let point of btc) {
  let newPoint = {date: point.date};
  newPoint.BTC = point;
  let index = gold.findIndex((d) => d.date === newPoint.date);
  if (index !== -1) {
    gold = gold.slice(index);
    newPoint.GOLD = gold.shift();
    foundCount++;
  } else {
    index = gold.findIndex((d) => d.date >= newPoint.date);
    newPoint.GOLD = gold[index];
    missingCount++;
  }
  data.push(newPoint);
}
  
console.log(`Found ${foundCount}, Missing ${missingCount} data points for gold`);

fs.writeFileSync('src/data/GOLD-BTC.json', JSON.stringify(data, null, 2));
