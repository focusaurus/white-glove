var spy = require("through2-spy").obj;

function getStream() {
  var total = 0;
  var stream = spy(function() {
    total++;
  });
  stream.end = function end() {
    return total;
  };
  return stream;
}

module.exports = getStream;
