#!/usr/bin/env node
var MongoClient = require("mongodb").MongoClient;

function getStream(options, callback) {
  MongoClient.connect(options.url, function(error, db) {
    if (error) {
      callback(error);
      return;
    }
    var stream = db.collection(options.collection).find().stream();
    stream.on("end", db.close.bind(db));
    callback(null, stream);
  });
}

module.exports = getStream;

if (require.main === module) {
  getStream(require("minimist")(process.argv.slice(2)), require("./stream"));
}
