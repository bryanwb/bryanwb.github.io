const createServer = require('http').createServer;
const trace = require('jstrace');

const server = createServer((req, res) => {
  res.setHeader('content-type', 'application/json')
  trace('request:start', {url: req.url});
  let statusCode;
  let body;
  if (req.url == '/prognosis') {
    statusCode = 200;
    body = {ok: true}
  } else {
    statusCode = 404;
    body = {error: "notfound"};
  }
  res.writeHead(statusCode);
  res.end(JSON.stringify(body));
  trace('request:end', {statusCode: statusCode, body: body});
});

server.listen(9999, function () { console.error('up') });
