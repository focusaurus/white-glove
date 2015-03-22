var obj = require("through2-spy").obj;

function spy(transform) {
  return obj(function closure(object){
    // http://stackoverflow.com/a/29196775/266795
    this._readableState.length = 0;
    transform(object);
  });
}

module.exports = spy;
