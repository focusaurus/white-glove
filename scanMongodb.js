#!/usr/bin/env node
var countTypesStream = require("./countTypes").stream();
var DevNull = require("dev-null-stream");
var mongodbFootman = require("./footmen/mongodb");
var rules = require("./rules");

function onEnd() {
  console.log("----- Results -----");
  console.log(rules(countTypesStream.stats));
  console.log("----- Stats -----");
  console.log(countTypesStream.stats);
}

mongodbFootman(process.argv[2], process.argv[3], function (error, mongoStream) {
  if (error) {
    console.error(error, "UNEXPECTED_ERROR");
    return;
  }
  mongoStream.pipe(countTypesStream);
  countTypesStream
    .on("error", console.error)
    .on("end", onEnd)
    .pipe(new DevNull());
});
