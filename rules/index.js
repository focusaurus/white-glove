var consistentTypes = require("./consistentTypes");
var Results = require("./Results");

function allRules(stats) {
  var results = new Results();
  consistentTypes(stats, results);
  return results;
}

module.exports = allRules;
