var through2 = require("through2");
var countTypes = require("../countTypes");

function buildCountTypesStream() {
  var stats = {};
  var stream = through2.obj(function (object, enc, callback) {
    countTypes(stats, null, object);
    console.log("@bug countTypes stream handler invoking callback", object._id);
    callback(null, object);
  });
  stream.stats = stats;
  return stream;
}

module.exports = buildCountTypesStream;
