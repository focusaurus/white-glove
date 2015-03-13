var tipe = require("tipe");
var has = require("lodash.has");

function analyze(stats, path, object) {
  stats = stats || {};
  path = path || "";
  for (var key in object) {
    var theType = tipe(object[key]);
    var keyPath = path.length ? path + "." + key : key;
    if (theType === "object") {
      analyze(stats, keyPath, object[key]);
      return;
    }
    var typeCounts = stats[keyPath] || {};
    if (has(typeCounts, theType)) {
      typeCounts[theType] += 1;
    } else {
      typeCounts[theType] = 1;
    }
    stats[keyPath] = typeCounts;
  }
}

module.exports = analyze;
