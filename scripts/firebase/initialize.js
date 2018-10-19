'use strict';
const admin = require('firebase-admin');

const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://hotair-5049a.firebaseio.com',
});

const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};

firestore.settings(settings);

async function main(db) {

  let gold = db.collection('assets').doc('gold');
  await gold.set({color: '#CFB53B', measure: '/kg'});

  let bitcoin = db.collection('assets').doc('bitcoin');
  await bitcoin.set({name: 'BTC', color: "#ff7f0e"});

}


main(firestore);
