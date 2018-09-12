const express = require('express');
const path = require('path');

const port = process.argv[2] || 9001;
const app = express();


app.get('/search', (req, res) => {
  res.send(req.query);
});

app.listen(port);
