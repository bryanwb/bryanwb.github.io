let buffers = []

process.stdin.on('readable', () => {
  let chunk = process.stdin.read();
  if (chunk != null ) {
    buffers.push(chunk);
  }
}).on('end', () => {
  console.log(Buffer.concat(buffers));
});
