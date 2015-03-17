#!/usr/bin/env node
var MongodbFootman = require("./footmen/mongodb");
var countTypes = require("./countTypes");
var rules = require("./rules");
var stats = {};

function end() {
  console.log(rules(stats));
  console.log("done", stats);
}

var footman = new MongodbFootman(process.argv[2], process.argv[3]);

footman.on("error", console.error);
footman.on("end", end);
footman.on("object", countTypes.bind(null, stats, null));
footman.start();
