const max = +process.argv[2];
let FizzBuzz = {
  [Symbol.iterator]() {
    let num = 1;
    return {
      next() {
        let value;
        if (num % 3 === 0 && num % 5 === 0) {
          value = 'FizzBuzz';
        } else if (num % 3 === 0) {
          value = 'Fizz';
        } else if (num % 5 === 0) {
          value = 'Buzz';
        } else {
          value = num;
        }
        num++;
        if (num > max + 1) {
          return {done: true};
        } else {
          return {done: false, value: value};
        }
      }
    }
  }
};

for (let n of FizzBuzz) {
  console.log(n);
}
