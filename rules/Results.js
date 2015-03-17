var _ = require("lodash");

function Results() {
  if (!this instanceof Results) {
    return new Results();
  }
  this.errors = [];
  this.warnings = [];
  this.infos = [];
}

Results.prototype._add = function _add(level, message, extra) {
  this[level + "s"].push(_.extend({message: message}, extra));
};

Results.prototype.error = function (message, extra) {
  this._add("error", message, extra);
};

Results.prototype.warning = function (message, extra) {
  this._add("warning", message, extra);
};

Results.prototype.info = function (message, extra) {
  this._add("info", message, extra);
};

module.exports = Results;
