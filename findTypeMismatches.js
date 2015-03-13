var size = require("lodash.size");

function findTypeMismatches(stats) {
  var mismatches = [];
  for (var keyPath in stats) {
    var typeCounts = stats[keyPath];
    if (size(typeCounts) > 1) {
      mismatches.push(keyPath);
    }
  }
  return mismatches;
}

module.exports = findTypeMismatches;
