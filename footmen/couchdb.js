var _ = require("lodash");
var cradle = require("cradle");
var streamArray = require("stream-array");

var defaults = {
  host: "localhost",
  port: 5984,
  secure: false
};

function getStream(options, callback) {
  options = _.defaults(options, defaults);
  if (options.password) {
    options.auth = {
      username: options.user,
      password: options.password
    };
  }
  var connection = new cradle.Connection(
    options.host, options.port || 5984, options);
  var database = connection.database(options.database);
  database.view(options.view, function (error, objects) {
    if (error) {
      callback(error);
      return;
    }
    callback(null, streamArray(_.pluck(objects, "value")));
  });
}

module.exports = getStream;
