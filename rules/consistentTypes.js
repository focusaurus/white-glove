var _ = require("lodash");

function check(stats) {
  var paths = [];
  for (var keyPath in stats) {
    var typeCounts = stats[keyPath];
    var types = _.keys(typeCounts);
    types = _.without(types, "null");
    if (types.length > 1) {
      paths.push(keyPath);
    }
  }
  return paths;
}

module.exports = check;


// function findTypeMismatches(stats) {
//   var mismatches = [];
//   for (var keyPath in stats) {
//     var typeCounts = stats[keyPath];
//     if (_.size(typeCounts) > 1) {
//       mismatches.push(keyPath);
//     }
//   }
//   return mismatches;
// }
