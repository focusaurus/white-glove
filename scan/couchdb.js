#!/usr/bin/env node
var _ = require("lodash");
var cradle = require("cradle");
var streamArray = require("stream-array");
var url = require("url");

function getStream(options, callback) {
  var parsedUrl = url.parse(options.url);
  parsedUrl = _.defaults(parsedUrl, {
    host: "localhost",
    port: 5984
  });
  var couchdbOptions = {
    secure: false
  };
  if (options.password) {
    couchdbOptions.auth = {
      username: options.user,
      password: options.password
    };
  }
  var connection = new cradle.Connection(
    parsedUrl.hostname, parsedUrl.port, couchdbOptions);
  var splitPath = parsedUrl.pathname.split("/");
  splitPath.shift();
  var databaseName = splitPath.shift();
  var view = splitPath.join("/");
  var database = connection.database(databaseName);
  database.view(view, function (error, objects) {
    if (error) {
      callback(error);
      return;
    }
    callback(null, streamArray(_.pluck(objects, "value")));
  });
}
module.exports = getStream;

if (require.main === module) {
  getStream(require("minimist")(process.argv.slice(2)), require("./stream"));
}
