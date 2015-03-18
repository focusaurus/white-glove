var _ = require("lodash");
var test = require("tape");
var stringPatterns = require("./stringPatterns");

_.each([
  ["email", "a@example.com"],
  ["hexadecimal", "abcDEF0123456789FEDcba321"],
  ["hexadecimal:objectid", "24aaaaaaaabbbbbbbbbbcccc"],
  ["date:iso8601", "2015"],
  ["date:iso8601", "2015-03-17"],
  ["date:iso8601", "2015-03-18T03:07:48.575Z"]
], function(pair) {

  test("stringPatterns should count patterns properly", function(assert) {
    var stats = stringPatterns(null, "key", pair[1]);
    assert.equal(stats.key[pair[0]], 1);
    assert.end();
  });
});

test("stringPatterns should omit non-matching strings", function(assert) {
  var stats = stringPatterns(null, "key", "no pattern matches this");
  assert.true(_.isEmpty(stats));
  assert.end();
});
