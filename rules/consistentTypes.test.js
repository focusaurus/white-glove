var _ = require("lodash");
var test = require("tape");
var countTypes = require("../countTypes");
var consistentTypes = require("./consistentTypes");

test("rules/consistentTypes should find paths", function(assert) {
  var input1 = {one: true, two: false, three: []};
  var input2 = {one: false, two: true, three: []};
  var input3 = {one: false, two: "false", three: []};
  var stats = {};
  countTypes(stats, null, input1);
  countTypes(stats, null, input2);
  countTypes(stats, null, input3);
  assert.equal(_.difference(consistentTypes(stats), ["two"]).length, 0);
  assert.end();
});
