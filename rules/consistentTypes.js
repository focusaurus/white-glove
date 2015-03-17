var _ = require("lodash");

function check(stats, results) {
  for (var keyPath in stats) {
    var typeCounts = stats[keyPath];
    var types = _.keys(typeCounts);
    types = _.without(types, "null");
    if (types.length > 1) {
      results.warning("Inconsistent Types", {keyPath: keyPath, types: types});
    }
  }
}

module.exports = check;
