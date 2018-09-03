const http = require('http');
const fs = require('fs');
const { Transform } = require('stream');


const port = process.argv[2];

const makeUpperTransform = () => {
  return new Transform({
    transform(chunk, encoding, callback) {
      if (chunk != null) {
        this.push(chunk.toString().toUpperCase());
      } else {
        this.push(null);
    }
      return callback();
    }
  });
};

const server = http.createServer((req, res) => {
  if (req.method !== 'POST') {
    res.writeHead(503);
    res.end();
  } else {
    res.writeHead(200, {'content-type': 'text/plain'});
    req.pipe(makeUpperTransform()).pipe(res);
  }
});

server.listen(port);
