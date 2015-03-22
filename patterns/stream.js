var _ = require("lodash");
var consistent = require("./consistent");
var count = require("./count");
var ResultSet = require("../ResultSet");
var spy = require("../spy");

function buildPatternStream() {
  var stats = {};
  //http://stackoverflow.com/a/29196775/266795
  var stream = spy(function transform(object) {
    count(stats, null, object);
  });
  stream.end = function patternEnd() {
    var resultSet = new ResultSet();
    resultSet.stats = _.omit(stats, "");
    consistent(resultSet);
    stream.resultSet = resultSet;
  };
  return stream;
}

module.exports = buildPatternStream;
