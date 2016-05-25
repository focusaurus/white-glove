var test = require('tape-catch')
var countTypes = require('./count')
var consistentTypes = require('./consistent')
var ResultSet = require('../ResultSet')

test('types/consistent should find paths', function (assert) {
  var input1 = {
    one: true,
    two: false,
    three: []
  }
  var input2 = {
    one: false,
    two: true,
    three: []
  }
  var input3 = {
    one: false,
    two: 'false',
    three: []
  }
  var stats = {}
  var resultSet = new ResultSet()
  countTypes(stats, null, input1)
  countTypes(stats, null, input2)
  countTypes(stats, null, input3)
  resultSet.stats = stats
  consistentTypes(resultSet)
  var expected = [{
    message: 'inconsistent types',
    keyPath: 'two',
    types: ['boolean', 'string']
  }]
  assert.deepEqual(resultSet.warnings, expected)
  assert.end()
})

test('types/consistent should ignore null and undefined', function (assert) {
  var input1 = {
    one: true
  }
  var input2 = {
    one: null
  }
  var input3 = {} // undefined
  var stats = {}
  var resultSet = new ResultSet()
  countTypes(stats, null, input1)
  countTypes(stats, null, input2)
  countTypes(stats, null, input3)
  resultSet.stats = stats
  consistentTypes(resultSet)
  assert.deepEqual(resultSet.warnings.length, 0)
  assert.end()
})
