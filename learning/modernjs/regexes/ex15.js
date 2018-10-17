const alert = console.log;
let reg = /^([A-F0-9]{2}:){5}[A-F0-9]{2}$/;

alert( reg.test('01:32:54:67:89:AB') ); // true

alert( reg.test('0132546789AB') ); // false (no colons)

alert( reg.test('01:32:54:67:89') ); // false (5 numbers, must be 6)

alert( reg.test('01:32:54:67:89:ZZ') ) // false (ZZ ad the end)
