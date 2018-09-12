const ex5 = require('./ex5');

const scenario = ex5;

scenario(process.argv[2], (err, data) => {
  if (err) { throw err; }
  console.log(data);
});


