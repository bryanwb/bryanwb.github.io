const express = require('express');
const path = require('path');

const port = process.argv[2] || 9001;
const app = express();


app.put('/message/:id', (req, res) => {
  
  let hash = require('crypto').createHash('sha1').update(new Date().toDateString() + req.params.id).digest('hex');
  res.end(hash);
});

app.listen(port);
