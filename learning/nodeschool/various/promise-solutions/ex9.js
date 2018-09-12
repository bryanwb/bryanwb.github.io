
const parsePromised = (json) => {
  return new Promise((fulfill, reject) => {
    try {
      fulfill(JSON.parse(json));
    } catch (ex) {
      reject(ex);
    }
  });
}

parsePromised(process.argv[2]).then(console.log).catch((e) => console.log(e.message));
