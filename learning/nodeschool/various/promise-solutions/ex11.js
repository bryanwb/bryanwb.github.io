const all = (prom1, prom2) => {
  let counter = 0;
  let results = [null, null];

  return new Promise((fulfill, reject) => {
    prom1.then((val) => {
      counter = counter + 1;
      results[0] = val;
      if (counter >= 2) {
        fulfill(results);
      }
    });
    prom2.then((val) => {
      counter = counter + 1;
      results[1] = val;
      if (counter >= 2) {
        fulfill(results);
      }
    });
  });
};


all(getPromise1(), getPromise2()).then(console.log);
//all(Promise.resolve('foo'), Promise.resolve('bar')).then(console.log);

