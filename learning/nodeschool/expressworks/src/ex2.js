const express = require('express');
const path = require('path');

const port = process.argv[2] || 9001;
const dir = process.argv[3] || path.join(__dirname, 'public');

const app = express();
app.use(express.static(dir));

app.listen(port);
