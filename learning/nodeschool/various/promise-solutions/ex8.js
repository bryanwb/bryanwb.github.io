
const attachTitle = (title) => {
  return 'DR. ' + title;
};

const promise = Promise.resolve('MANHATTAN');
promise.then(attachTitle).then(console.log);
