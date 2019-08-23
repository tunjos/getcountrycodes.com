const MongoClient = require('mongodb').MongoClient;

let cachedDb = null

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb
  }

  const client = await MongoClient.connect(process.env.GCC_MONGODB_URI, { useNewUrlParser: true })
  const db = await client.db()

  cachedDb = db
  return db
}

// The implememntation above hides the error
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
  // const collection = client.db().collection("Users");
  // collection.find({}).limit(2).toArray(function(err, docs) {
      // console.log(docs);
      // client.close();
    // });
  // perform actions on the collection object
  // client.close();
// });

module.exports = connectToDatabase()
