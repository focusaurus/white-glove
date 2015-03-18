var _ = require("lodash");
var ObjectID = require("mongodb").ObjectID;
var spy = require("through2-spy");
var tipe = require("tipe");

var EMAIL_RE = /.@./;
/* eslint max-len:0 */
//http://www.pelagodesign.com/blog/2009/05/20/iso-8601-date-validation-that-doesnt-suck/
var ISO8601_RE = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
var checksByPatternName = {
  hexadecimal: function hexadecimal(theString) {
    return /^[a-f0-9]+$/i.test(theString);
  },
  "hexadecimal:objectid": function objectid(theString) {
    return ObjectID.isValid(theString);
  },
  email: function (theString) {
    return EMAIL_RE.test(theString);
  },
  "date:iso8601": function (theString) {
    return ISO8601_RE.test(theString);
  }
};

function countPatterns(stats, keyPath, theString) {
  var patternCounts = stats[keyPath] || {};
  _.each(checksByPatternName, function (checker, pattern) {
    if (checker(theString)) {
      patternCounts[pattern] = patternCounts[pattern] || 0;
      patternCounts[pattern]++;
    }
  });
  stats[keyPath] = patternCounts;
}

function stringPatterns(stats, keyPath, input) {
  stats = stats || {};
  keyPath = keyPath || "";
  var theType = tipe(input);
  switch (theType) {
    case "object":
      for (var key in input) {
        var subPath = keyPath.length ? keyPath + "." + key : key;
        stringPatterns(stats, subPath, input[key]);
      }
      break;
    case "array":
      var nextPath = keyPath + "[]";
      input.forEach(function(item) {
        stringPatterns(stats, nextPath, item);
      });
      break;
    case "string":
      countPatterns(stats, keyPath, input);
      break;
  }
}

function buildStringPatternStream() {
  var stats = {};
  var stream = spy.obj(function patternTransform(object) {
    stringPatterns(stats, null, object);
  });
  stream.end = function patternEnd() {
    stream.results = _.omit(stats, "");
  };
  return stream;
}

module.exports = stringPatterns;
module.exports.stream = buildStringPatternStream;
