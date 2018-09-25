const mongo = require('mongodb').MongoClient;

mongo.connect('mongodb://localhost:27017', (err, client) => {
  if (err) { throw err; }
  const firstName = process.argv[2];
  const lastName = process.argv[3];
  const user = {firstName: firstName, lastName: lastName}
  const col = client.db('learnyoumongo').collection('docs');
  col.insertOne(user)
     .then(() => {
       console.log(JSON.stringify(user));
       client.close();
     })
     .catch((err) => {
       console.error(err);
       client.close();
     });
});
