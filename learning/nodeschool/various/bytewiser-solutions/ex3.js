process.stdin.on('data', (data) => {
  let index = 0;
  for (const b of data) {
    if (b === 46) {
      data.write('!', index);
    }
    index = index + 1;
  }
  console.log(data);

});

        /* const buff = process.stdin.read();
         * 
         * for (const b of buff) {
         *   if (b.value === 46) {
         *     buff.write(33, buff.offset);
         *   }
         * }
         * console.log('hello!'); */
