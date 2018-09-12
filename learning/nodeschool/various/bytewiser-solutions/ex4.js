const fs = require('fs');

const path = process.argv[2];
let NL = '\n'.charCodeAt(0);

fs.readFile(path, (err, data) => {
  let offset = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i] === NL) {
      console.log(data.slice(offset, i));
      i++; 
      offset = i;
    }
  }
  console.log(data.slice(offset));
});
