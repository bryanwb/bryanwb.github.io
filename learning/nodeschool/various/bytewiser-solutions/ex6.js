
process.stdin.on('readable', () => {
  let chunk = process.stdin.read();
  if (chunk != null) {
    console.log(JSON.stringify(new Uint8Array(chunk)));
  }
});
