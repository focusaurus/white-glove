var cradle = require("cradle");
var streamArray = require("stream-array");

function getStream(url, database, view, callback) {
  var connection = new cradle.Connection(url, 5984);
  var db = connection.database(database);
  db.view(view, function (error, objects) {
    if (error) {
      callback(error);
      return;
    }
    callback(null, streamArray(objects));
  });
}

module.exports = getStream;
