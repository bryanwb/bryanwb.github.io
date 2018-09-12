let promise = new Promise((fulfill, reject) => {
  setTimeout(() => {
    try {
      throw new Error('REJECTED!');
    } catch (ex) {
      reject(ex);
    }
  }, 300);
});

const onReject = (err) => {
  console.log(err.message);
};

promise.then((val) => console.log(val), onReject);
