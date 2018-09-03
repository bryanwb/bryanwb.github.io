const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve(process.argv[2]), 'utf8', (err, data) => {
  if (err) {throw err; }
  console.log(data.split('\n').length);
});
