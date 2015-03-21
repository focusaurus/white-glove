var _ = require("lodash");
var consistent = require("./consistent");
var count = require("./count");
var ResultSet = require("../ResultSet");
var spy = require("through2-spy");

function buildPatternStream() {
  var stats = {};
  var stream = spy.obj(function patternTransform(object) {
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
