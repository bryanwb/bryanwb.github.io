const http = require('http');
const url = require('url');

const port = process.argv[2] || 9001;

const server = http.createServer((req, res) => {
  let reqUrl = url.parse(req.url, true);
  if (req.method !== 'GET' || !['/api/parsetime', '/api/unixtime'].includes(reqUrl.pathname)) {
    res.writeHead(503);
    res.end();
  } else {
    let d = new Date(reqUrl.query.iso);
    let doc;
    if (/^\/api\/parsetime/.test(req.url)) {
      doc = {
        hour: d.getHours(),
        minute: d.getMinutes(),
        second: d.getSeconds(),
      }
    } else {
      doc = {'unixtime': d.valueOf()};
    }
    res.writeHead(200, {'content-type': 'application/json'});
    res.end(JSON.stringify(doc));
  }
});

server.listen(port);


