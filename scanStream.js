var countTypesStream = require("./types/stream")();
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

function scanStream(error, stream) {
  if (error) {
    console.error(error, "UNEXPECTED_ERROR");
    return;
  }
  stream
    .on("error", console.error)
    .on("end", onEnd)
    .pipe(totalStream)
    .pipe(countTypesStream)
    .pipe(stringPatternsStream)
    // http://stackoverflow.com/q/29189888/266795
    .pipe(terminus.devnull({objectMode: true}));
}

module.exports = scanStream;
