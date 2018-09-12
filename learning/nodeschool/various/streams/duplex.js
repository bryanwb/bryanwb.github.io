const { Duplex, PassThrough } = require('stream');

class inoutStream extends Duplex {

  constructor(options) {
    super(options);
    this.data = [];
    this.readableFlowing = false;
  }
  
  _write(chunk, encoding, callback) {
    this.data.push(chunk);
    this.readableFlowing = true;
    callback()
  }
  
  _read(size){
    let chunk = this.data.shift();
    if (this.readableFlowing) {
      this.push(chunk);
    }
  }
  
}

const pass = new PassThrough();

process.stdin.pipe(pass).pipe(process.stdout);
