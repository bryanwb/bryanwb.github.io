const express = require('express');
const fs = require('fs');

const port = process.argv[2] || 9001;
const booksFile = process.argv[3];

const app = express();


app.get('/books', (req, res) => {
  fs.readFile(booksFile, (err, data) => {
    res.send(JSON.parse(data.toString()));
  });
});

app.listen(port);
