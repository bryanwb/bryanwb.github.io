function f(a) {
  console.log(a)
};

function throttle(func, timeout) {

  let isCoolDown = false;
  let scheduledCallArgs = null;
  
  function throttledFunc(...args) {
    if (isCoolDown) {
      scheduledCallArgs = args;
      console.log('skipping, is throttled');
    } else {
      isCoolDown = true;
      setTimeout(() => {
        isCoolDown = false;
        if (scheduledCallArgs) {
          console.log(`called with ${scheduledCallArgs}`);
          func.apply(this, scheduledCallArgs);
        }
      }, timeout);
      return func.apply(this, args);
    }

  };
  return throttledFunc;
};

// f1000 passes calls to f at maximum once per 1000 ms
let f1000 = throttle(f, 1000);

f1000(1); // shows 1
f1000(2); // (throttling, 1000ms not out yet)
f1000(3); // (throttling, 1000ms not out yet)
f1000(4); // (throttling, 1000ms not out yet)
//setTimeout(() => f1000(4), 1000); // (throttling, 1000ms not out yet)
