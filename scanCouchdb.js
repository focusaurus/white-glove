#!/usr/bin/env node
var options = require("minimist")(process.argv.slice(2));
require("./footmen/couchdb")(
  options.url, options.db, options.view, require("./scanStream"));
