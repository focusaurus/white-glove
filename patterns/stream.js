var _ = require("lodash");
var consistent = require("./consistent");
var count = require("./count");
var ResultSet = require("../ResultSet");
var spy = require("through2-spy").obj;

function buildPatternStream() {
  var stats = {};
  var stream = spy(function transform(object) {
    count(stats, null, object);
  });
  stream.end = function patternEnd() {
    var resultSet = new ResultSet();
    resultSet.stats = _.omit(stats, "");
    consistent(resultSet);
    return resultSet;
  };
  return stream;
}

module.exports = buildPatternStream;
