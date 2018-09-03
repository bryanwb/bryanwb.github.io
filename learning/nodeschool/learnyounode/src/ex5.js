const fs = require('fs');
const path = require('path');

const dirname = process.argv[2];
const extension = process.argv[3];

fs.readdir(dirname, (err, files) => {
  if (err) {throw err; }
  console.log(
    files.filter((f) => f.endsWith('.' + extension)).join(', ')
  );
  
});


