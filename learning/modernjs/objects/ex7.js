const alert = console.log;

function f(a, b) {
  alert(a + b);
}

Function.prototype.defer = function(timeout) {
  let savedThis = this;
  return (arg1, arg2) => {
    setTimeout(() => savedThis(arg1, arg2), timeout);
  }
}

f.defer(1000)(1, 2);
