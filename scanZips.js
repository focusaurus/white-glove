var zips = require("./zips");
var stats = {};
var countTypes = require("./countTypes");
var rules = require("./rules");

zips.forEach(function(zip) {
  countTypes(stats, null, zip);
});
console.log(rules(stats));
