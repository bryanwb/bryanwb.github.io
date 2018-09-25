const mongo = require('mongodb').MongoClient;

mongo.connect('mongodb://localhost:27017', (err, client) => {
  if (err) { throw err; }

  const col = client.db('learnyoumongo').collection('prices');
  col.aggregate([{ $match: { size: process.argv[2] } },
                 { $group: {
                   _id: 'average',
                   average: {
                     $avg: '$price'
                   },
                 }}]).toArray((errAggregate, results) => {
                   if (errAggregate) { throw errAggregate; }
                   console.log(Number(results[0].average).toFixed(2));
                   client.close();
                 });
  /* 
   * col.find({ size: process.argv[2] }).toArray((errFind, docs) => {
   *   if (errFind) { throw errFind; }
   *   docs.aggregate
   *   client.close();
   * }); */
});
