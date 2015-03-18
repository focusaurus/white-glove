#!/usr/bin/env node

var countTypesStream = require("./countTypes").stream();
var totalStream = require("./countTotal")();
var mongodbFootman = require("./footmen/mongodb");
var rules = require("./rules");
var stringPatternsStream = require("./stringPatterns").stream();
var mux = require("mux");

function onEnd() {
  countTypesStream.end();
  stringPatternsStream.end();
  console.log("Total scanned:", totalStream.total);
  console.log("----- Rule Analysis -----");
  console.log(rules(countTypesStream.results));
  console.log("----- Type Counts -----");
  console.log(countTypesStream.results);
  console.log("----- String Patterns -----");
  console.log(stringPatternsStream.results);
}

mongodbFootman(process.argv[2], process.argv[3], function(error, mongoStream) {
  if (error) {
    console.error(error, "UNEXPECTED_ERROR");
    return;
  }
  mongoStream
    .on("error", console.error)
    .on("end", onEnd)
    .pipe(mux(totalStream, countTypesStream, stringPatternsStream));
});
