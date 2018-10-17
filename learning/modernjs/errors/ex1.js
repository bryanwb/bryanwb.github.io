const alert = console.log;

class FormatError extends SyntaxError {
  constructor(msg) {
    super(msg);
    this.name = 'FormatError';
  }
}
let err = new FormatError("formatting error");

alert( err.message ); // formatting error
alert( err.name ); // FormatError
alert( err.stack ); // stack

alert( err instanceof FormatError ); // true
alert( err instanceof SyntaxError );
