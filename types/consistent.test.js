var test = require("tape");
var countTypes = require("./count");
var consistentTypes = require("./consistent");
var ResultSet = require("../ResultSet");

test("rules/consistentTypes should find paths", function(assert) {
  var input1 = {
    one: true,
    two: false,
    three: []
  };
  var input2 = {
    one: false,
    two: true,
    three: []
  };
  var input3 = {
    one: false,
    two: "false",
    three: []
  };
  var stats = {};
  var resultSet = new ResultSet();
  countTypes(stats, null, input1);
  countTypes(stats, null, input2);
  countTypes(stats, null, input3);
  resultSet.stats = stats;
  consistentTypes(resultSet);
  var expected = [{
    message: "inconsistent types",
    keyPath: "two",
    types: ["boolean", "string"]
  }];
  assert.deepEqual(resultSet.warnings, expected);
  assert.end();
});
