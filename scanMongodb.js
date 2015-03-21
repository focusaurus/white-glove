#!/usr/bin/env node

var countTypesStream = require("./types/stream")();
var mongodbFootman = require("./footmen/mongodb");
var mux = require("mux");
var stringPatternsStream = require("./patterns/stream")();
var totalStream = require("./countTotal")();

function onEnd() {
  countTypesStream.end();
  stringPatternsStream.end();
  console.log("Total scanned:", totalStream.total);
  console.log("----- Type Analysis -----");
  console.log(countTypesStream.resultSet);
  console.log("----- String Pattern Analysis -----");
  console.log(stringPatternsStream.resultSet);
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
