const printNumbers = (from, to) => {
  setTimeout(() => {
    console.log(from);
    from++;
    if (from <= to) {
      printNumbers(from, to);
    }
  }, 1000)

};

printNumbers(5, 10);
