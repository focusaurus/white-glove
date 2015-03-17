#!/usr/bin/env node
var mongodbFootman = require("./footmen/mongodb");
var countTypes = require("./countTypes");
var rules = require("./rules");
var stats = {};

function onData(object) {
  countTypes(stats, null, object);

}
function onEnd() {
  console.log(rules(stats));
  console.log("done", stats);
}

mongodbFootman(process.argv[2], process.argv[3], function (error, stream) {
  if (error) {
    console.error(error, "UNEXPECTED_ERROR");
    return;
  }
  stream.on("data", onData);
  stream.on("error", console.error);
  stream.on("end", onEnd);
});
