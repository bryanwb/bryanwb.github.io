const alert = console.log;
function makeClass(phrase) {
  // declare a class and return it
  return class {
    static sayHi() {
      alert(phrase);
    };
  };
}

let User = makeClass("Hello");

User.sayHi(); // Hello
