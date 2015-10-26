var _ = require('lodash')

function countUndefined (stats, total) {
  for (var keyPath in stats) {
    var counts = _.values(stats[keyPath])
    var definedCount = _.sum(counts)
    stats[keyPath].undefined = total - definedCount
    if (stats[keyPath].undefined < 1) {
      delete stats[keyPath].undefined
    }
  }
}

module.exports = countUndefined
