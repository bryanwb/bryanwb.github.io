const path = require('path');
const myfirstmodule = require('./myfirstmodule');

const dirname = process.argv[2];
const extension = process.argv[3];
const buff1 = Buffer.alloc(10);

myfirstmodule.filterDir(dirname, extension, (err, files) => {
  if (err) {throw err; }
  console.log(files);
});


