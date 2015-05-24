var _ = require("lodash");
var type = require("../type");

var EMAIL_RE = /.@./;
/* eslint-disable max-len */
//http://www.pelagodesign.com/blog/2009/05/20/iso-8601-date-validation-that-doesnt-suck/
var ISO8601_RE = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
var INTEGER_RE = /^\d+$/;
/* eslint-enable max-len */
var checksByPatternName = {
  // hexadecimal: function hexadecimal(theString) {
  //   return /^[a-f0-9]+$/i.test(theString);
  // },
  "hexadecimal:objectid": function objectid(theString) {
    return /^[a-f0-9]{24}$/i.test(theString);
  },
  integer: function integer(theString) {
    return INTEGER_RE.test(theString);
  },
  email: function(theString) {
    return EMAIL_RE.test(theString) && theString.trim().indexOf("\n") < 0;
  },
  "date:iso8601": function(theString) {
    return ISO8601_RE.test(theString) &&
      !INTEGER_RE.test(theString) &&
      theString[0] !== "-";
  }
};

function countPatterns(stats, keyPath, theString) {
  var patternCounts = stats[keyPath] || {};
  _.each(checksByPatternName, function(checker, pattern) {
    if (checker(theString)) {
      if (pattern === "email") {
        console.log("email", keyPath, theString);
      }
      patternCounts[pattern] = patternCounts[pattern] || 0;
      patternCounts[pattern]++;
    }
  });
  if (!_.isEmpty(patternCounts)) {
    stats[keyPath] = patternCounts;
  }
}

function stringPatterns(stats, keyPath, input) {
  stats = stats || {};
  keyPath = keyPath || "";
  var theType = type(input);
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
  // this is mostly a convenience for unit testing
  return stats;
}

module.exports = stringPatterns;
