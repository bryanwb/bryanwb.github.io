function alert(msg) {
  console.log(msg);
};

function debounce(func, timeout) {
  let running = false;
  function debouncedFunc(...args) {
    if (!running) {
      running = true;
      func.apply(this, args);
      setTimeout(() => {
        running = false;
      }, timeout);
    } else {
      console.log('skipping this invocation');
    }
  }

  return debouncedFunc;
};

let f = debounce(alert, 1000);
let f1 = debounce(alert, 1000);

f(1); // runs immediately
f1(5); // should run immediately
f(2); // ignored
f1(10);

setTimeout( () => f(3), 100); // ignored ( only 100 ms passed )
setTimeout( () => f(4), 1100); // runs
setTimeout( () => f(5), 1500); 
