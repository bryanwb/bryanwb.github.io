const prom = new Promise((fulfill, reject) => {
  fulfill('I FIRED');
  reject(new Error('I DID NOT FIRE'));
});

const onRejected = (err) => {
  console.log(err.message);
};

prom.then(console.log, onRejected);
