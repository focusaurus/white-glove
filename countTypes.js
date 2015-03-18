var _ = require("lodash");
var ObjectID = require("mongodb").ObjectID;
var spy = require("through2-spy").obj;
var type = require("./type");

function increment(stats, keyPath, theType) {
  var typeCounts = stats[keyPath] || {};
  if (_.has(typeCounts, theType)) {
    typeCounts[theType] += 1;
  } else {
    typeCounts[theType] = 1;
  }
  stats[keyPath] = typeCounts;
}

function countTypes(stats, keyPath, input) {
  stats = stats || {};
  keyPath = keyPath || "";
  var theType = type(input);
  switch (theType) {
    case "object":
      increment(stats, keyPath, theType);
      for (var key in input) {
        var subPath = keyPath.length ? keyPath + "." + key : key;
        countTypes(stats, subPath, input[key]);
      }
      break;
    case "array":
      var nextPath = keyPath + "[]";
      increment(stats, keyPath, theType);
      input.forEach(function(item) {
        countTypes(stats, nextPath, item);
      });
      break;
    default:
      increment(stats, keyPath, theType);
  }
  // this is mostly a convenience for unit testing
  return stats;
}

function buildCountTypesStream() {
  var stats = {};
  var stream = spy(function(object) {
    countTypes(stats, null, object);
  });
  stream.end = function end() {
    stream.results = _.omit(stats, "");
  };
  return stream;
}

module.exports = countTypes;
module.exports.stream = buildCountTypesStream;
