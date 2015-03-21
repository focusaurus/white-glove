var _ = require("lodash");

function check(resultSet) {
  for (var keyPath in resultSet.stats) {
    var counts = resultSet.stats[keyPath];
    var patterns = _.keys(counts);
    patterns = _.without(patterns, "null");
    if (patterns.length > 1) {
      resultSet.warning("inconsistent patterns", {
        keyPath: keyPath,
        patterns: patterns
      });
    }
  }
}

module.exports = check;
