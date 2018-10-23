'use strict';

const Storage = require('@google-cloud/storage');

let srcFile = process.argv[2];
let dest = process.argv[3];

async function doUpload() {
  let storage = new Storage({projectId: 'hotair-5049a'})
  let b = storage.bucket('hotair-5049a.appspot.com')
  await b.upload(srcFile, {gzip: true, destination: dest});
}

doUpload();
