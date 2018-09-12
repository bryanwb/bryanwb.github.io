const express = require('express');
const path = require('path');
const stylus = require('stylus');

const port = process.argv[2] || 9001;
const app = express();

app.use(stylus.middleware('public'));
app.use(express.static('public'));
app.listen(port);
