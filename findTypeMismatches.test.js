var countTypes = require("./countTypes");
var difference = require("lodash.difference");
var findTypeMismatches = require("./findTypeMismatches");
var test = require("tape");

test("findTypeMismatches should return correct keyPaths", function(assert) {
  var stats = {};
  var input1 = {one: "", two: []};
  var input2 = {one: false, two: []};
  countTypes(stats, null, input1);
  countTypes(stats, null, input2);
  var mismatches = findTypeMismatches(stats);
  assert.equal(difference(mismatches, ["one"]).length, 0);
  assert.end();
});
