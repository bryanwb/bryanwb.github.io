require('heapdump');

var createServer = require("http").createServer;
var server = createServer(function (req, res) {
  let foobar = 'baz';
  res.end("hello");
});
server.listen(9876, function () {
  console.log("listening");
});
