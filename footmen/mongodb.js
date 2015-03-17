var MongoClient = require("mongodb").MongoClient;

function getStream(url, collection, callback) {
  MongoClient.connect(url, function(error, db) {
    if (error) {
      callback(error);
      return;
    }
    var stream = db.collection(collection).find().stream();
    stream.on("end", db.close.bind(db));
    callback(null, stream);
  });
}

module.exports = getStream;
