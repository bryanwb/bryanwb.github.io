const alert = console.log;
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
})

arr[2]();
