var test = require("tape");
var countTypes = require("./countTypes");

test("countTypes should store type info per-path", function(assert) {
  var stats = {};
  countTypes(stats, null, {
    one: "one",
    two: false,
    three: 42,
    four: [],
    five: [1],
    six: function() {}
  });
  assert.equal(stats.one.string, 1);
  assert.equal(stats.two.boolean, 1);
  assert.equal(stats.three.number, 1);
  assert.equal(stats.four.array, 1);
  assert.equal(stats.five.array, 1);
  assert.equal(stats.six.function, 1);
  assert.end();
});

test("countTypes should count type instances properly", function(assert) {
  var stats = {};
  countTypes(stats, null, {
    one: true,
    two: 42
  });
  countTypes(stats, null, {
    one: false,
    two: "TWO"
  });
  countTypes(stats, null, {
    one: true,
    two: [2, 2]
  });
  assert.equal(stats.one.boolean, 3);
  assert.equal(stats.two.number, 1);
  assert.equal(stats.two.string, 1);
  assert.equal(stats.two.array, 1);
  assert.end();
});

test("countTypes should handle nested objects as paths", function(assert) {
  var stats = {};
  countTypes(stats, null, {
    oneA: {
      twoA: 42,
      twoB: {
        threeA: false
      }
    }
  });
  assert.equal(stats["oneA.twoA"].number, 1);
  assert.equal(stats["oneA.twoB.threeA"].boolean, 1);
  countTypes(stats, null, {
    oneA: {
      twoA: 42,
      twoB: {
        threeA: false
      }
    }
  });
  assert.equal(stats["oneA.twoA"].number, 2);
  assert.equal(stats["oneA.twoB.threeA"].boolean, 2);
  assert.end();
});
