#!/usr/bin/env node
var countTypesStream = require("./countTypes").stream();
var mongodbFootman = require("./footmen/mongodb");
var rules = require("./rules");

function onEnd() {
  console.log(rules(countTypesStream.stats));
  console.log("done", countTypesStream.stats);
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
    .on("data", function (doc) {
      console.log("@bug countTypesStream data", doc);
    });
});
