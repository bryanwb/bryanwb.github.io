const http = require('http');
const bl = require('bl');

const url1 = process.argv[2];
const url2 = process.argv[3];
const url3 = process.argv[4];

let urls = [
    {
      url: url1,
      data: [],
      done: false,
    },
    {
      url: url2,
      data: [],
      done: false,
    },
    {
      url: url3,
      data: [],
      done: false,
    },
];


async function http_get(urlObj) {
  return new Promise((resolve, reject) => {
    http.get(urlObj.url, response => {
      response.setEncoding('utf8');
      response.on('data', (data) => {
        urlObj.data.push(data)
      });
      response.on('end', () => {
        resolve();
      });
    }).on('error', (e) => {
      console.log(`hit a big error ${e.toString()}`);
      reject(e);
    });
  });
}

async function main() {
  await Promise.all(urls.map((u) => http_get(u)));
  for (const urlObj of urls) {
    console.log(urlObj.data.join(''));
  }
}

main();
