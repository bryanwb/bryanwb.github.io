const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const dbDir = path.resolve(__dirname, '..', 'db');
const dataPath = path.join(dbDir, 'data');
const logPath = path.join(dbDir, 'logs', 'mongod.log');
const pidfile = path.join(dbDir, 'mongod.pid');

async function readPidFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(pidfile, {encoding: 'utf8'}, (err, data) => {
      if (err) { reject(err); }
      resolve(data.trim());
    });
  });
}

async function execAsync(args) {
  return new Promise((resolve, reject) => {
    childProcess.exec(args, {encoding: 'utf8'}, (err, stdout, stderr) => {
      if (err) { reject(err); }
      resolve(stdout);
    });
  });

}

async function isMongoRunning() {
  // Returns the pid of running Mongod or false
  if (!fs.existsSync(pidfile)) {
    return false;
  }

  let pid = await readPidFile();
  if (pid === '') {
    return false;
  }

  let stdout = await execAsync('ps -eo pid');
  return stdout.trim()
               .split('\n')
               .filter((foundPid) => foundPid === pid)[0] || false;

}

async function startMongo() {
  await execAsync(
    `mongod --dbpath ${dataPath} --logpath ${logPath} --pidfilepath ${pidfile} --fork`
  );
  return await readPidFile();
}

async function stopMongo(pid) {
  await execAsync(`kill ${pid}`);
  await new Promise((resolve) => fs.unlink(pidfile, resolve));
}

module.exports = {
  isMongoRunning: isMongoRunning,
  startMongo: startMongo,
  stopMongo: stopMongo,
}
