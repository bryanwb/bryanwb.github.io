const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');

const port = process.argv[2] || 9001;
const app = express();

const reverseString = (str) => {
  return str.split('').reverse().join('');
};

app.use(bodyparser.urlencoded({extended: false}));

app.post('/form', (req, res) => {
  res.end(reverseString(req.body.str));
});

app.listen(port);
