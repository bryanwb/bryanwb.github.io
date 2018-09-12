'use strict';
const path = require('path');
const fs = require('fs');
const dbUtils = require('./dbUtils');

async function startMongo() {
  let pidRunningMongo = await dbUtils.isMongoRunning();
  if (pidRunningMongo) {
    console.log(`Mongo already running with pid ${pidRunningMongo}`);
  } else {
    console.log('Starting Mongo');
    let newPid = await dbUtils.startMongo();
    console.log(`Mongod running with pid ${newPid}`);
  }
}

startMongo();
