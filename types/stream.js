var _ = require("lodash");
var consistent = require("./consistent");
var countTypes = require("./count");
var ResultSet = require("../ResultSet");
var spy = require("through2-spy").obj;

function buildCountTypesStream() {
  var stats = {};
  var stream = spy(function transform(object) {
    countTypes(stats, null, object);
  });
  stream.end = function end() {
    var resultSet = new ResultSet();
    resultSet.stats = _.omit(stats, "");
    consistent(resultSet);
    return resultSet;
  };
  return stream;
}

module.exports = buildCountTypesStream;
