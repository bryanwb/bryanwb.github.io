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


const http_get = (urlObj) => {
  return http.get(urlObj.url, response => {
    console.log('executing httpget');
    response.on('data', (data) => {
      urlObj.data.push(data)
    });
    response.on('end', () => { urlObj.done = true });
  }).on('error', (e) => {
    console.log(`hit a big error ${e.toString()}`);
  });
};

for (const urlObj of urls) {
  http.get(urlObj.url, response => {
    response.on('data', (data) => {
      urlObj.data.push(data)
    });
    response.on('end', () => {
      urlObj.done = true;
      if (urls.every((_urlObj) => _urlObj.done)) {
        for (const _urlObj of urls) {
          console.log(_urlObj.data.join(''));
        }
      }
    });
  }).on('error', (e) => {
    console.log(`hit a big error ${e.toString()}`);
  });
}


/* while (!urls.every((urlObj) => urlObj.done)) {
 *   console.log('BWB - sleeping');
 *   setTimeout(() => true, 1000);
 * }
 * 
 * for (const urlObj of urls) {
 *   console.log(`url: ${urlObj.url}, count: ${urlObj.data.length}`);
 * }
 *      */
