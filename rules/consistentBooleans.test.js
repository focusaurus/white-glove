var test = require("tape");
var countTypes = require("../countTypes");
var consistentBooleans = require("./consistentBooleans");
var difference = require("lodash.difference");

test("rules/consistentBooleans should find paths", function(assert) {
  var input1 = {one: true, two: false, three: []};
  var input2 = {one: false, two: true, three: []};
  var input3 = {one: false, two: "false", three: []};
  var stats = {};
  countTypes(stats, null, input1);
  countTypes(stats, null, input2);
  countTypes(stats, null, input3);
  assert.equal(difference(consistentBooleans(stats), ["two"]).length, 0);
  assert.end();
});
