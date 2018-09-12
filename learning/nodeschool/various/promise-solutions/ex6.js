let promise = new Promise((fulfill, reject) => {
  reject(new Error('OHNO!'));
});

promise.catch((err) => console.error(err.message));

let promise1 = Promise.resolve('IT WORKED!');
promise1.then(console.log);

let promise2 = Promise.reject('IT FAILED!');
promise2.catch(console.error);
