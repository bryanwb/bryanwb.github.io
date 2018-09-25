const mongo = require('mongodb').MongoClient;

mongo.connect('mongodb://localhost:27017', (err, client) => {
  if (err) { throw err; }

  const col = client.db('learnyoumongo').collection('users');
  col.update({ username: 'tinatime' }, { $set: { age: 40 } }, (errUpdate, res) => {
    if (errUpdate) { throw errUpdate; }
    client.close();
  });
});
