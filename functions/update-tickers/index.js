'use strict';

const fs = require('fs');
const axios = require('axios');
const {Storage} = require('@google-cloud/storage');

let storage = new Storage({projectId: 'hotair-5049a'});

const CURRENCY_LAYER_API_KEY = process.env.CURRENCY_LAYER_API_KEY;
const CURRENCY_LAYER_URL = 'http://apilayer.net/api/historical';

const CMC_PRO_API_KEY = process.env.CMC_PRO_API_KEY;
const CMC_URL  = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC';

// estimated total kg of gold in the world
const goldKgWorldwide = 202172750;

let filename = '/bitcoinvsgold/data.json';

async function updateMetadata() {
  //let storage = new Storage({projectId: 'hotair-5049a'})

  let b = storage.bucket('hotair-5049a.appspot.com')
  const f = b.file(filename);
  let [metadata, apiResponse] = await f.getMetadata();
  metadata.cacheControl = 'public, max-age=31536000';
  await f.setMetadata(metadata);
}

function normalizeDate(d) {
  d.setUTCHours(0);
  d.setUTCMinutes(0);
  d.setUTCSeconds(0);
  d.setUTCMilliseconds(0);
  return d;
}

function incrementDate(d) {
  // bump the day by one
  d.setUTCDate(d.getUTCDate() + 1);
  return d;
}

function makeMissingDays(last) {
  let dataset = [];
  let startDate = incrementDate(normalizeDate(new Date(last.date)));
  
  let lastGold = last.GOLD;
  let lastBtc = last.BTC;
  let today = normalizeDate(new Date());
  
  while (startDate <= today) {
    dataset.push(new Date(startDate.valueOf()));
    startDate = incrementDate(startDate);
  }
  return dataset;
}

const zerofill = (num) => {
  return num < 10 ? '0' + num.toString() : num.toString();
};

const getBtcCap = () => {
  return new Promise((resolve, reject) => {
    axios.get(CMC_URL, {headers: {'X-CMC_PRO_API_KEY': CMC_PRO_API_KEY}})
         .then(response => {
           const marketCap = response.data.data.BTC.quote.USD.market_cap;
           if (!marketCap) {
             reject(new Error(`Market cap has invalid value ${marketCap}`));
           }
           resolve(marketCap);
         })
         .catch(err => reject(err));
  });
};

const goldOunceToKg = (price) => {
  return price / 0.0311035;
};

// Currency Layer's free plan only supports fetching one historical date at a time
const fetchDay = (date, btcCap) => {
  const formattedDate = `${date.getUTCFullYear()}-${zerofill(date.getUTCMonth())}-${zerofill(date.getUTCDate())}`;
  const url = `${CURRENCY_LAYER_URL}?date=${formattedDate}&currencies=BTC,XAU&access_key=${CURRENCY_LAYER_API_KEY}`;
  
  return new Promise((resolve, reject) => {
    axios.get(url)
         .then(response => {
           let data = response.data;
           if (!data.success) {
             console.dir(data);
             reject(new Error(`Request failed with result ${data}`));
           }

           let goldKg = goldOunceToKg(1 / data.quotes.USDXAU);
           let goldCap = goldKg * goldKgWorldwide;
           
           resolve({
             date: date.valueOf(),
             "GOLD": {
               close: goldKg,
               cap: goldCap,
             },
             "BTC":  {
               close: 1 / data.quotes.USDBTC,
               cap: btcCap,
             },
           });
         }).catch(err => reject(err));
  });
};

async function fetchDays(days, btcCap) {
  let prices = await Promise.all(days.map(d => fetchDay(d, btcCap)));
  return prices;
}

async function main() {
  let b = storage.bucket('hotair-5049a.appspot.com')
  const f = b.file(filename);
  let [data] = await f.download();
  let contents = JSON.parse(data);
  let currentDayCount = contents.length;
  
  // get the current bitcoin market cap
  // sadly, no current provider provides market cap and historical data for free
  let btcCap = await getBtcCap();
  console.log(`Current BtcCap is ${btcCap}`);
  
  // let contents = JSON.parse(fs.readFileSync('/home/hitman/tmp/data.json'));
  let missingDays = makeMissingDays(contents[contents.length - 1]);
  if (missingDays.length < 1) {
    console.log('No missing days');
  } else if (missingDays.length > 2) {
    console.log(`Missing dates from ${missingDays[0]} to ${missingDays[missingDays.length - 1]}`);
  } else {
    console.log(`Missing day ${missingDays[0]}`);
  }
  
  let days = await fetchDays(missingDays, btcCap);
  contents = contents.concat(days);
  let newDayCount = contents.length;

  if (newDayCount < currentDayCount) {
    throw new Error(`New count of days ${newDayCount} is less old one ${currentDayCount}`);
  } else {
    console.log(`Added ${newDayCount - currentDayCount} days`);
  }
  
  await f.save(JSON.stringify(contents), {gzip: true,
                                          contentType: 'application/json'});
  await f.setMetadata({cacheControl: 'max-age=86400'});
  return newDayCount - currentDayCount;
}

exports.updateTickers = async (req, res) => {
  let updateCount;
  try {
    updateCount = await main();
    res.send(`${updateCount} days updated`);
  } catch(err) {
    res.status(503).send(`encountered error ${err.toString()}`);
  }
};

main();
