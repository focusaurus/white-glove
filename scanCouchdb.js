#!/usr/bin/env node
require("./footmen/couchdb")(
  process.argv[2], process.argv[3], process.argv[4], require("./scanStream"));
