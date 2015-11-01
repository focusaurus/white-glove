#!/usr/bin/env node
var getCouchStream = require('./scan/couchdb')
var getMongoStream = require('./scan/mongodb')
var options = require('minimist')(process.argv.slice(2))
var scanStream = require('./scan/stream')

var URL_RE = /^(mongodb|https?):\/\/./i

if (!URL_RE.test(options.url)) {
  console.error('Invalid url. Must be mongodb://host/db or http://host:5984')
  process.exit() // eslint-disable-line no-process-exit
}

if (options.url.toLowerCase().indexOf('mongodb') === 0) {
  getMongoStream(options, scanStream)
} else {
  getCouchStream(options, scanStream)
}
