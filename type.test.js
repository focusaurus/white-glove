var ObjectID = require("mongodb").ObjectID;
var test = require("tape");
var type = require("./type");

test("type should work properly", function (assert) {
  assert.equal(type(true), "boolean");
  assert.equal(type(false), "boolean");
  assert.equal(type(0), "number");
  assert.equal(type(-1), "number");
  assert.equal(type(42.42), "number");
  assert.equal(type(new Date()), "date");
  assert.equal(type(function(){}), "function");
  assert.equal(type(test), "function");
  assert.equal(type("a"), "string");
  assert.equal(type([]), "array");
  assert.equal(type({}), "object");
  assert.equal(type(new ObjectID()), "objectid");
  assert.end();
});
