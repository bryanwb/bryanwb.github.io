const http = require('http');
const bl = require('bl');

const url = process.argv[2];
let allData = [];
const req = http.get(url, response => {
  response.pipe(bl((err, data) => {
    if (err) { return console.error(err); };
    data = data.toString();
    console.log(data.length);
    console.log(data);
  }));
}).on('error', (e) => {
     console.log(`hit a big error ${e.toString()}`);
})

