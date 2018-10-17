function f(x) {
  console.log(x);
}

function delay(func, timeout) {
  return (...args) => {
    setTimeout(() => {
      return f.apply(this, args);
    }, timeout);
  };
}

// create wrappers
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // shows "test" after 1000ms
f1500("test");
