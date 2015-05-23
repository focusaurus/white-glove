#!/usr/bin/env node
var getMongodbStream = require("./mongodb");
var getCouchdbStream = require("./couchdb");
var joi = require("joi");
var options = require("minimist")(process.argv.slice(2));
var scanStream = require("./stream");
var url = require("url");

// End user runs something like
// ssh \
// -R 5656:localhost:27017 \
// carson@carson.io \
// --server=mongodb
// --port=5656 \
// --database=stores \
// --collection=cars
var PORT = joi.number().integer().min(1024).max(65535).required();
var NAME = joi.string().regex(/^[a-z0-9_-]+$/i);
var PATH = joi.string().regex(/^[a-z0-9_/-]+$/i);
var optionsSchema = joi.object().keys({
  collection: PATH,
  database: NAME,
  port: PORT,
  server: joi.any().valid("mongodb", "couchdb")
});

delete options._;
var valid = joi.validate(options, optionsSchema);

if (valid.error) {
  console.error("Oops your command is invalid. Please correct and retry");
  valid.error.details.forEach(function (detail) {
    console.error("\t" + detail.path + ": " + detail.message);
  });
  process.exit(33);
}

var urlValues = {
  protocol: "mongodb",
  slashes: true,
  hostname: "localhost",
  port: options.port,
  pathname: options.database + "/" + options.collection
};
var getStream = getMongodbStream;
switch (options.server) {
  case "couchdb":
    urlValues.protocol = "http";
    getStream = getCouchdbStream;
  break;
}
var scanOptions = {
  collection: options.collection,
  url: url.format(urlValues)
};

getStream(scanOptions, scanStream);
