let myint = process.argv[2];

let my32arr = Uint32Array.of(Number(myint));

console.log(JSON.stringify(new Uint16Array(my32arr.buffer)));
