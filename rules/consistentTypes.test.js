var _ = require("lodash");
var test = require("tape");
var countTypes = require("../countTypes");
var consistentTypes = require("./consistentTypes");
var Results = require("./Results");

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
  var results = new Results();
  countTypes(stats, null, input1);
  countTypes(stats, null, input2);
  countTypes(stats, null, input3);
  consistentTypes(stats, results);
  var expected = [{
    message: "Inconsistent Types",
    keyPath: "two",
    types: ["boolean", "string"]
  }];
  assert.deepEqual(results.warnings, expected);
  assert.end();
});
