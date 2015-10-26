var test = require('tape')
var countUndefined = require('./countUndefined')

test('countUndefined should count correctly', function (assert) {
  var stats = {foo: {string: 42}}
  countUndefined(stats, 50)
  assert.equal(stats.foo.undefined, 8)

  stats = {foo: {string: 42, number: 2}}
  countUndefined(stats, 50)
  assert.equal(stats.foo.undefined, 6)

  stats = {foo: {string: 42, number: 2, boolean: 5}}
  countUndefined(stats, 50)
  assert.equal(stats.foo.undefined, 1)
  assert.end()
})

test('countUndefined should not have key present for 0', function (assert) {
  var stats = {foo: {string: 8}}
  countUndefined(stats, 8)
  assert.equal(stats.foo.undefined, void 0)
  assert.end()
})
