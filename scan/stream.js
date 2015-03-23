var patternStream = require("../patterns/stream")();
var terminus = require("terminus");
var totalStream = require("../countTotal")();
var typeStream = require("../types/stream")();
var util = require("util");

function out(message) {
  console.log(util.inspect(message, {depth: null}));
}

function onEnd() {
  console.log("Total scanned: " + totalStream.end());
  console.log("----- Type Analysis -----");
  out(typeStream.end());
  console.log("----- String Pattern Analysis -----");
  out(patternStream.end());
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
    .pipe(typeStream)
    .pipe(patternStream)
    // http://stackoverflow.com/q/29189888/266795
    .pipe(terminus.devnull({objectMode: true}));
}

module.exports = scanStream;
