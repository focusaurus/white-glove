var spy = require("./spy");

function getStream() {
  var stream = spy(function() {
    stream.total++;
  });
  stream.total = 0;
  return stream;
}

module.exports = getStream;
