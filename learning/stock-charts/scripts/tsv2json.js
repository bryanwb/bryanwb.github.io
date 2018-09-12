const fs = require('fs');
const path = require('path');
const tsvParse = require("d3-dsv").tsvParse;
const timeParse = require("d3-time-format").timeParse;

const parseDate = timeParse("%Y-%m-%d");

let tsvFile = process.argv[2];
let outJson = process.argv[3];

new Promise((resolve, reject) => {
  fs.readFile(tsvFile, (err, data) => {
    if (err) { reject(err); }
    return resolve(
      tsvParse(data.toString(), d => {
      let d1 = {}
      d1.date = parseDate(d.date).getTime().toString();
      d1.open = d.open;
      d1.high = d.high;
      d1.low = d.low;
      d1.close = d.close;
      d1.volume = d.volume;
      
      return d1;
      })
    );
  });
}).then(d => {
  return new Promise((resolve, reject) => {
    fs.writeFile(outJson, JSON.stringify(d), (err) => {
      if (err) { reject(err); }
      resolve();
    });
  });
}).catch(console.error);
