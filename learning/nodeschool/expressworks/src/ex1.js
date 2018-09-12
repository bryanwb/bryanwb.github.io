const express = require('express');

const port = process.argv[2] || 9001;
const app = express();
app.get('/home', (req, res) => {
  res.end('Hello World!');
});

app.listen(port);
