var size = require("lodash.size");

function check(typeCounts) {
  var paths = [];
  for (var keyPath in typeCounts) {
    var counts = typeCounts[keyPath];
    var hasBoolean = counts.boolean && counts.boolean > 0;
    if (hasBoolean && size(counts) > 1) {
      paths.push(keyPath);
    }
  }
  return paths;
}

module.exports = check;
