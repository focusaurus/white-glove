var consistentTypes = require("./consistentTypes");

function allRules(stats) {
  var results = {
    error: [],
    warning: [],
    info: []
  };
  var keyPaths = consistentTypes(stats);
  keyPaths.forEach(function(keyPath) {
    results.warning.push({
      keyPath: keyPath,
      description: "Inconsistent types found"
    });
  });
  return results;
}

module.exports = allRules;
