var tipe = require("tipe");
var has = require("lodash.has");
var ObjectID = require("mongodb").ObjectID;

function increment(stats, keyPath, theType) {
  var typeCounts = stats[keyPath] || {};
  if (has(typeCounts, theType)) {
    typeCounts[theType] += 1;
  } else {
    typeCounts[theType] = 1;
  }
  stats[keyPath] = typeCounts;
}

function countTypes(stats, path, object) {
  stats = stats || {};
  path = path || "";
  for (var key in object) {
    var value = object[key];
    var theType = tipe(value);
    var keyPath = path.length ? path + "." + key : key;
    if (theType === "object") {
      if (value instanceof ObjectID) {
        increment(stats, keyPath, "objectid");
      } else {
        countTypes(stats, keyPath, value);
      }
    } else {
      increment(stats, keyPath, theType);
    }
  }
}

module.exports = countTypes;
