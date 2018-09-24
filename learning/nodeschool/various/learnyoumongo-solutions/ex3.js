const mongo = require('mongodb').MongoClient;

mongo.connect('mongodb://localhost:27017', (err, client) => {
  if (err) { throw err; }

  const col = client.db('learnyoumongo').collection('parrots');
  col.find({})
    .toArray((err1, docs) => {
      if (err1) { throw err1; }
      console.log(docs.filter((d) => d.age > process.argv[2]));
      client.close();
    });
  /* .then((docs) => docs.filter((d) => d.age > process.argv[2]))
   * .then((docs) => {
   *   console.log(docs);
   *   db.close();
   * })
   * .catch(console.error); */
});
