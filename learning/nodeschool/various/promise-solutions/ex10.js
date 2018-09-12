
const alwaysThrows = () => {
  throw new Error("OH NOES");
}

const iterate = (arg) => {
  console.log(arg);
  return arg + 1;
};

const resolveIterate = (val) => {
  return Promise.resolve(iterate(val));
};

resolveIterate(1)
  .then(resolveIterate)
  .then(resolveIterate)
  .then(resolveIterate)
  .then(resolveIterate)
  .then(alwaysThrows)
  .then(resolveIterate)
  .then(resolveIterate)
  .then(resolveIterate)
  .then(resolveIterate)
  .then(resolveIterate)
  .then(resolveIterate)
  .catch((e) => console.log(e.message));

