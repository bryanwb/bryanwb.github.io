var rawArgs = process.argv.slice(2);
var args = [];

rawArgs.forEach(val => {
  let commaSep = val.split(',');
  commaSep.forEach(val => {
    if(val !== '') args.push(+val);
  });
});

const avg = (...args) => {
  return args.reduce((acc, curr) => acc + curr) / args.length;
}

console.log(avg(...args));
