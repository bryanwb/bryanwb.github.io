const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const url = 'https://coinmarketcap.com/currencies/bitcoin/historical-data/?start=20130428&end=20180910';
const outputJson = 'src/data/BTC.json';

(async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  let dataPoints = await page.evaluate(() => {

    // this function must be in the scope of page.evaluate
    const parseRow = (row) => {
      const items = Array.from(row.children);
      return {
        date: new Date(items[0].innerText).getTime().toString(),
        open: items[1].attributes['data-format-value'].value,
        high: items[2].attributes['data-format-value'].value,
        low: items[3].attributes['data-format-value'].value,
        close: items[4].attributes['data-format-value'].value,
        volume: items[5].attributes['data-format-value'].value,
        cap: items[6].attributes['data-format-value'].value,
      };
    };

    
    let data = Array.from(
      document.querySelectorAll('#historical-data table tbody tr')
    ).reverse().map(parseRow);
    return data;
  });
  
  await browser.close();
  
  (new Promise((resolve, reject) => {
    fs.writeFile(path.resolve(__dirname, '..', outputJson), JSON.stringify(dataPoints),
                 (err) => {
                   if (err) { reject(err); }
                   resolve();
                 });
  })).catch(console.error);
})();
