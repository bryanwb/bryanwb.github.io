const mongo = require('mongodb').MongoClient;

mongo.connect('mongodb://localhost:27017', (err, client) => {
  if (err) { throw err; }

  const col = client.db(process.argv[2]).collection(process.argv[3]);
  col.remove({_id: process.argv[4]}, (errRemove, res) => {
    if (errRemove) { throw errRemove; }
    client.close();
  });
});
