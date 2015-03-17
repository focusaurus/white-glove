var _ = require("lodash");
var tipe = require("tipe");
var ObjectID = require("mongodb").ObjectID;

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
  var theType = tipe(input);
  switch (theType) {
    case "object":
      if (input instanceof ObjectID) {
        increment(stats, keyPath, "objectid");
        return;
      }
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
}

module.exports = countTypes;
