const http = require('http');

const url = process.argv[2];
let allData = [];
const req = http.get(url, response => {
  response.setEncoding('utf8');
  response.on('data', (data) => {
    allData.push(data);
  });
  response.on('end', () => {
    let text = allData.join('');
    console.log(text.length);
    console.log(text);
  });
}).on('error', (e) => {
     console.log(`hit a big error ${e.toString()}`);
})

