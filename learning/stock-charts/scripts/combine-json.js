const fs = require('fs');

let json1 = process.argv[2];
let json2 = process.argv[3];
let outfile = process.argv[4];

let jsonData1 = JSON.parse(fs.readFileSync(json1).toString());
let jsonData2 = JSON.parse(fs.readFileSync(json2).toString());

fs.writeFileSync(outfile, JSON.stringify(jsonData1.concat(jsonData2)));
