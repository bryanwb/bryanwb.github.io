let promise = new Promise((fulfill, reject) => {
  setTimeout(() => fulfill('FULFILLED!'), 300);
});

promise.then((val) => console.log(val));
