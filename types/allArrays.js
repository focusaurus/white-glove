var _ = require("lodash");

function check(resultSet) {
  for (var keyPath in resultSet.stats) {
    var typeCounts = resultSet.stats[keyPath];
    var types = _.keys(typeCounts);
    if (_.includes(types, "array") && types.length > 1) {
      resultSet.warning(
        "inconsistent use of arrays", {keyPath: keyPath, types: types});
    }
  }
}

module.exports = check;
