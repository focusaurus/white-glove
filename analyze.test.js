var test = require("tape");
var analyze = require("./analyze");

test("analyze should store type info per-path", function (assert) {
  var stats = {};
  analyze(stats, null, {
    one: "one",
    two: false,
    three: 42,
    four: [],
    five: [1],
    six: function(){}
  });
  assert.equal(stats.one.string, 1);
  assert.equal(stats.two.boolean, 1);
  assert.equal(stats.three.number, 1);
  assert.equal(stats.four.array, 1);
  assert.equal(stats.five.array, 1);
  assert.equal(stats.six.function, 1);
  assert.end();
});

test("analyze should count type instances properly", function (assert) {
  var stats = {};
  analyze(stats, null, {one: true, two: 42});
  analyze(stats, null, {one: false, two: "TWO"});
  analyze(stats, null, {one: true, two: [2, 2]});
  assert.equal(stats.one.boolean, 3);
  assert.equal(stats.two.number, 1);
  assert.equal(stats.two.string, 1);
  assert.equal(stats.two.array, 1);
  assert.end();
});
