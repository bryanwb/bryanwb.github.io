const mongo = require('mongodb').MongoClient;

mongo.connect('mongodb://localhost:27017', (err, client) => {
  if (err) { throw err; }

  const col = client.db('learnyoumongo').collection('parrots');
  col.find({
    age: {
      $gt: +process.argv[2]
    }
  }, {projection: {name: 1, age: 1, _id: 0}})
     .toArray((err1, docs) => {
      if (err1) { throw err1; }
      console.log(docs);
      client.close();
    });
});
