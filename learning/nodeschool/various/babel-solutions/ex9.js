const max = +process.argv[2];

let FizzBuzz = function*(maxVal) {
  let num = 1;
  let value;
  while (num < maxVal + 1) {
    if (num % 3 === 0 && num % 5 === 0) {
      value = 'FizzBuzz';
    } else if (num % 3 === 0) {
      value = 'Fizz';
    } else if (num % 5 === 0) {
      value = 'Buzz';
    } else {
      value = num;
    }
    yield value;
    num++;
  }
}(max);

for (var n of FizzBuzz) {
  console.log(n);
}
