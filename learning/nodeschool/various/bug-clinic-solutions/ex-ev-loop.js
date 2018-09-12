console.log('hi');

setTimeout(() => console.log('there'), 100);
setTimeout(() => {
  let foo = 'bar';
  console.log('again');
}, 100);

console.log('goodbye');
