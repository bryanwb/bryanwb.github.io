const express = require('express');
const path = require('path');

const port = process.argv[2] || 9001;
const templates = process.argv[3] || path.join(__dirname, 'templates');
const app = express();

app.set('view engine', 'pug');
app.set('views', templates);
app.get('/home', (req, res) => {
  res.render('index', {date: new Date().toDateString()});
});

app.listen(port);
