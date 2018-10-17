class ExtendedClock extends Clock {

  constructor({ template, precision = 1000 }) {
    super();
    this.precision = precision;
  }

  start() {
    this._render();
    this._timer = setInterval(() => this._render(), this.precision);
  }
  
}
