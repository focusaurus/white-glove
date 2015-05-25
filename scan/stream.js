var fs = require("fs");
var patternStream = require("../patterns/stream")();
var path = require("path");
var terminus = require("terminus");
var typeStream = require("../types/stream")();

function formatByLevel(resultSet) {
  var outArray = [];

  function out(value) {
    outArray.push(value);
  }
  [
    "Error", "Info", "Warning"
  ].forEach(function(level) {
    var key = level.toLowerCase() + "s";
    if (!resultSet[key].length) {
      out("No " + key + " found.\n");
    }
    resultSet[key].forEach(function(result) {
      out(level + ": ");
      out(result.keyPath + " " + result.message + " ");
      out(JSON.stringify(result.types));
    });
  });
  return outArray.join("");
}

function formatResults(results) {
  var outArray = [];

  function out(value) {
    outArray.push(value);
  }
  out("Analysis complete. ");
  out(results.typeStats.total);
  out(" records analyzed.\n\n");
  out("----- Type Analysis -----\n");
  out(JSON.stringify(results.typeStats.stats, null, 2));
  out("\n");
  out("\n");
  out("----- String Pattern Analysis -----\n");
  out(JSON.stringify(results.patternStats.stats, null, 2));
  out("\n");
  out("\n");
  out("----- String Pattern Analysis Messages -----\n");
  out(formatByLevel(results.patternStats));
  out("\n");
  out("\n----- Type Analysis Messages -----\n");
  out(formatByLevel(results.typeStats));
  out("\n");
  return outArray.join("");
}

function printResults() {
  var results = {
    typeStats: typeStream.end(),
    patternStats: patternStream.end()
  };
  console.log(formatResults(results));
}

function scanStream(error, stream) {
  if (error) {
    console.error(error, "Error scanning the stream");
    return;
  }
  stream
    .on("error", console.error)
    .on("end", printResults)
    .pipe(typeStream)
    .pipe(patternStream)
    // http://stackoverflow.com/q/29189888/266795
    .pipe(terminus.devnull({
      objectMode: true
    }));
}

module.exports = scanStream;
