const MongoClient = require("mongodb").MongoClient;

let cachedDb = null;

async function connectToDatabase() {
  console.log("Start: connectToDatabase");

  if (cachedDb) {
    return cachedDb;
  }

  let db;
  try {
    const client = await MongoClient.connect(process.env.GCC_MONGODB_URI, {
      useNewUrlParser: true
    }).catch(err => {
      console.log(err);
    });

    db = client.db();
    cachedDb = db;
  } catch (err) {
    console.log(err);
  }

  console.log("End: connectToDatabase");
  return db;
}

async function closeDatabaseConnection() {}

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

module.exports = {
  connectToDatabase: connectToDatabase
};
