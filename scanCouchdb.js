#!/usr/bin/env node
var options = require("minimist")(process.argv.slice(2));
require("./footmen/couchdb")(options, require("./scanStream"));
