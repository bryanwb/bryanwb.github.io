const fs = require('fs');
const path = require('path');
const { Writable, Transform } = require('stream');
const util = require('util');

let lastCmcDate = new Date(1367082000000);
//let lastCmcDate = new Date(1293840000000);
let dataPoints = [];
let line = [];

class Collection {
  constructor(options) {
    this.reset();
  };

  reset() {
    this.date = null;
    this.close = 0;
    this.volume = 0;
    this.count = 0;
  }

  add(item) {
    if (this.date === null) {
      this.date = item.date;
    }
    this.close = this.close + Number(item.close);
    this.volume = this.volume + Number(item.volume);
    this.count++;
  }

  rollUp() {
    let summary = {
      close: (this.close / this.count).toString(),      
      date: this.date.valueOf().toString(),
      volume: (this.volume / this.count).toString(),
    }
    console.log(`Rolled up ${this.count} data points for date ${this.date}`);
    this.reset();
    
    return summary;
  }
  
}

const splitting_re = /.*?(?:\r\n|\r|\n)|.*?$/g;

const ReadLineStream = new Transform({
  transform(chunk, encoding, next) {
    this.lineBuffer += chunk.toString('utf8');
    let lines = this.lineBuffer.match(splitting_re);

    // remove the empty string from the array if present at
    // the end
    if (lines[lines.length - 1] === '') {
      lines.pop();
    }
    
    let remainder = '';
    
    while(lines.length > 0) {
      let line = lines.shift();
      if (line.endsWith('\n')) {
        this.push(line.trim());
      } else if (lines.length === 0) {
        remainder = line;
      }
    }
    this.lineBuffer = remainder;

    next();
  }
});

Object.defineProperty(ReadLineStream, 'lineBuffer', {value: '', writable: true});

let currentCollection = new Collection();

const isValid = (dataPoint) => {
  return dataPoint.date.valueOf() > 0 && dataPoint.close && dataPoint.volume;
};


const parseDatapoints = (chunk) => {
  let statusContinue = true;
  
  let line = chunk.toString();
  const [date, close, volume] = line.split(',');
  
  let dataPoint = {
    date: new Date(+date * 1000),
    close: close,
    volume: volume,
  };

  if (!isValid(dataPoint)) {
    return statusContinue;
  }
    
  if (dataPoint.date.valueOf() >= lastCmcDate.valueOf()) {
    // push the current collection onto the stream and end the stream
    currentCollection.count > 0 && dataPoints.push(currentCollection.rollUp());
    // don't call next(), end the stream
    statusContinue = false;
    return statusContinue;
  }

  if (currentCollection.count === 0 || dataPoint.date.getUTCDay() == currentCollection.date.getUTCDay()) {
    currentCollection.add(dataPoint);
  } else {
    dataPoints.push(currentCollection.rollUp());
    currentCollection.add(dataPoint);
  }
  return statusContinue;
};


let inFile = path.resolve(process.argv[2]);
let outJson = 'src/data/BTC-MTGOX.json';

let stream = fs.createReadStream(inFile, {encoding: 'utf-8'})
               .pipe(ReadLineStream);

stream.on('data', (chunk) => {
  let statusContinue = parseDatapoints(chunk);
  if (!statusContinue) {
    stream.end();
    fs.writeFile(outJson, JSON.stringify(dataPoints), (err) => {
      if (err) {throw err; }
    });
  }
});
