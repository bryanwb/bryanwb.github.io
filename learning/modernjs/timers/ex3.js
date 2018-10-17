let i = 0;

let start = Date.now();

function count() {

  let timerId = setInterval(() => {
    // a piece of heavy job
    for(let j = 0; j < 1000000; j++) {
      i++;
    }
    if (i == 1000000000) {
      console.log("Done in " + (Date.now() - start) + 'ms');
      clearInterval(timerId);
    }
  }, 0);
  
  // a piece of heavy job
  for(let j = 0; j < 1000000; j++) {
    i++;
  }

}

count();
