const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const baseUrl = 'http://www.usagold.com/reference/goldprices/';
let urls = [];
for (let year of ['2010', '2011', '2012', '2013', '2014', '2015', '2016']) {
  urls.push(`${baseUrl}${year}.html`);
}

urls.push('http://www.usagold.com/reference/prices/goldhistory.php?ddYears=2017');
// the current year
urls.push('http://www.usagold.com/reference/prices/goldhistory.php');


const outputJson = 'src/data/GOLD.json';

const months = [
  'jan', 'feb', 'mar', 'apr', 'may',
  'jun', 'jul', 'aug', 'sep',
  'oct', 'nov', 'dec',
];

const zeroFill = (numStr) => {
  return numStr.length < 2 ? '0' + numStr : numStr;
};

function monthNameToNum(monthname) {
  let month = months.indexOf(monthname);
  if (month === -1) {
    throw new Error(`Cannot find month ${monthname}`);
  }

  return zeroFill((month + 1).toString());
}

const parseDate = (d) => {
  let datere = /(\d+)[ -](\w+)[ -](\d+)/;
  let match = d.match(datere);
  if (match === null) {
    throw new Error(`Date ${d} does not match regular expression`);
  }
  
  let [day, month, year] = match.slice(1);
  day = zeroFill(day);
  month = monthNameToNum(month.toLowerCase());
  year = year.length < 4 ? '20' + year : year;
  return new Date(`${year}-${month}-${day}`).valueOf();
};


(async () => {
  let dataPoints = []
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  for (let url of urls) {
    await page.goto(url, {waitUntil: 'networkidle0'});
    let dataPointSegment = await page.evaluate(() => {

      // how kg of gold there are estimated to be in the world
      const goldKgWorld = 171300000;

      // this function must be in the scope of page.evaluate
      const parseRow = (row) => {
        const items = Array.from(row.children);

        // note that we convert the Troy ounce price here to kg
        let closeKg = (Number(items[1].innerText) / 0.0311035);
        return {
          date: items[0].innerText,
          close: closeKg,
          cap: closeKg * goldKgWorld,
        };
      };
      
      let rows = Array.from(
        document.querySelectorAll('#quotes tbody tr')
      );

      //remove the header row
      rows.shift();
      return rows.reverse().map(parseRow);
    });
    console.log(`Found ${dataPointSegment.length} data points for ${url}`);
    dataPointSegment.forEach((d) => d.date = parseDate(d.date));
    dataPoints = dataPoints.concat(dataPointSegment);
  }
  
  await browser.close();
  
  (new Promise((resolve, reject) => {
    fs.writeFile(path.resolve(__dirname, '..', outputJson), JSON.stringify(dataPoints, null, 2),
                 (err) => {
                   if (err) { reject(err); }
                   resolve();
                 });
  })).catch(console.error);
})();
