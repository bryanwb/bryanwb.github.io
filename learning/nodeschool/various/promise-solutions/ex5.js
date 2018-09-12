const prom1 = new Promise((fulfill, reject) => {
  fulfill('PROMISE VALUE');
});

prom1.then(console.log);

console.log('MAIN PROGRAM');
