const alert = console.log;

function f() {
  alert('hello');
}

Function.prototype.defer = function(timeout) {
  setTimeout(this, timeout);
}

f.defer(1000);
