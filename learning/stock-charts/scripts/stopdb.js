'use strict';
const path = require('path');
const fs = require('fs');
const dbUtils = require('./dbUtils');

async function stopMongo() {
  let pidRunningMongo = await dbUtils.isMongoRunning();
  if (!pidRunningMongo) {
    console.log('Mongo not running, nothing to stop');
  } else {
    await dbUtils.stopMongo(pidRunningMongo);
    console.log(`Killed mongod with pid ${pidRunningMongo}`);
  }
}

stopMongo();
