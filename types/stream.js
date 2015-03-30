var _ = require("lodash");
var consistent = require("./consistent");
var countUndefined = require("./countUndefined");
var countTypes = require("./count");
var ResultSet = require("../ResultSet");
var spy = require("through2-spy").obj;

function buildCountTypesStream() {
  var stats = {};
  var total = 0;

  var stream = spy(function transform(object) {
    total++;
    countTypes(stats, null, object);
  });
  stream.end = function end() {
    var resultSet = new ResultSet();
    resultSet.stats = _.omit(stats, "");
    resultSet.total = total;
    countUndefined(stats, total);
    consistent(resultSet);
    return resultSet;
  };
  return stream;
}

module.exports = buildCountTypesStream;
