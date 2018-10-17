function work(a, b) {
  console.log(a + b);
}


function spy(func) {
  function decorator(...args) {
    decorator.calls.push(`call:${args.join(',')}`);
    return func.apply(this, args);
  }
  decorator.calls = [];

  return decorator;
}


work = spy(work);
work(1, 2);
work(4, 5);

for (let args of work.calls) {
  console.log(args);
}
