var _ = require("lodash");

function check(resultSet) {
  for (var keyPath in resultSet.stats) {
    var typeCounts = resultSet.stats[keyPath];
    var types = _.keys(typeCounts);
    types = _.without(types, "null", "undefined");
    if (types.length > 1) {
      resultSet.warning("inconsistent types", {keyPath: keyPath, types: types});
    }
  }
}

module.exports = check;
