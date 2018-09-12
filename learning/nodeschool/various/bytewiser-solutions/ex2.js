let buff = process.stdin.read();

for (const b of buff) {
  if (b.value === 46) {
    buff.write(33, buff.offset);
  }
}
console.log('hello!');
