const printNumbers = (from, to) => {
  let current = from;

  let timerId = setInterval(() => {
    console.log(current);
    current++;
    if (current > to) {
      clearInterval(timerId)
    }
  }, 1000)

};

printNumbers(5, 10);
