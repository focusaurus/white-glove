#!/usr/bin/env node
var options = require("minimist")(process.argv.slice(2));

require("./footmen/mongodb")(
  options.url, options.collection, require("./scanStream"));
