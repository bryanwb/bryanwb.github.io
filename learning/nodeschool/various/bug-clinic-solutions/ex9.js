const createServer = require('http').createServer;
const replify = require('replify');
const replpad = require('replpad');

const replFunc = (cb) => {
  const server = createServer((req, res) => {
    res.end('hello!');
  })

  let repl = replify({name: "bug-clinic", start: replpad}, {"__message": "REPLs are neat"});

  server.listen(8080, function () { console.error('listening') });
  cb(server, repl);
}

module.exports = replFunc;
