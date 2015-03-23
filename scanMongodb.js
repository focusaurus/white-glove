#!/usr/bin/env node
require("./footmen/mongodb")(
  process.argv[2], process.argv[3], require("./scanStream"));
