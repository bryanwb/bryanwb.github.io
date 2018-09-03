const http = require('http');

const url = process.argv[2];

const req = http.get(url, response => {
  response.setEncoding('utf8');
  response.on('data', (data) => {
    console.log(data);
  });
}).on('error', (e) => {
     console.log(`hit a big error ${e.toString()}`);
});

/* req.on('error', (e) => {
 *   console.log('hit a big error');
 * });
 * 
 * req.end(); */

