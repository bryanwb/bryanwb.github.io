const fs = require('fs');

let data = JSON.parse(fs.readFileSync('src/data/BTC.json').toString());
data.forEach(d => {
  let date = new Date(Number(d.date));
  date.setUTCHours(0);
  date.setUTCMinutes(0);
  date.setUTCSeconds(0);
  d.date = date.valueOf();
  d.close = Number(d.close);
  for (let key of ['cap', 'open', 'high', 'volume', 'low']) {
    let value = d[key];
    if (value) {
      if (value === '-') {
        d[key] = null;
      } else {
        d[key] = Number(value);
      }
    }
  }
});

fs.writeFileSync('src/data/BTC-normal.json', JSON.stringify(data, null, 2));
