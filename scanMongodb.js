#!/usr/bin/env node

var countTypesStream = require("./types/stream")();
var mongodbFootman = require("./footmen/mongodb");
var stringPatternsStream = require("./patterns/stream")();
var terminus = require("terminus");
var totalStream = require("./countTotal")();
var util = require("util");


function out(message) {
  console.log(util.inspect(message, {depth: null}));
}

function onEnd() {
  countTypesStream.end();
  stringPatternsStream.end();
  console.log("Total scanned: " + totalStream.total);
  console.log("----- Type Analysis -----");
  out(countTypesStream.resultSet);
  console.log("----- String Pattern Analysis -----");
  out(stringPatternsStream.resultSet);
}

mongodbFootman(process.argv[2], process.argv[3], function(error, mongoStream) {
  if (error) {
    console.error(error, "UNEXPECTED_ERROR");
    return;
  }
  mongoStream
    .on("error", console.error)
    .on("end", onEnd)
    .pipe(totalStream)
    .pipe(countTypesStream)
    .pipe(stringPatternsStream)
    // http://stackoverflow.com/q/29189888/266795
    .pipe(terminus.devnull({objectMode: true}));
});
