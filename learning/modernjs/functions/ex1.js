function makeCounter() {

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  counter.set = (val) => {
    counter.count = val;
  };

  counter.decrease = (val) => {
    counter.count = counter.count - val;
  };
  

  return counter;
}
