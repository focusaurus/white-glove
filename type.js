var ObjectID = require("mongodb").ObjectID;
var tipe = require("tipe");

function type(value) {
  var theType = tipe(value);
  if (theType !== "object") {
    return theType;
  }
  if (value instanceof ObjectID) {
    return "objectid";
  }
  return theType;
}

module.exports = type;
