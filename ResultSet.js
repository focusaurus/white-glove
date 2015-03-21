var _ = require("lodash");

function ResultSet() {
  if (!this instanceof ResultSet) {
    return new ResultSet();
  }
  this.errors = [];
  this.warnings = [];
  this.infos = [];
  this.stats = {};
}

ResultSet.prototype._add = function _add(level, message, extra) {
  this[level + "s"].push(_.extend({message: message}, extra));
};

ResultSet.prototype.error = function (message, extra) {
  this._add("error", message, extra);
};

ResultSet.prototype.warning = function (message, extra) {
  this._add("warning", message, extra);
};

ResultSet.prototype.info = function (message, extra) {
  this._add("info", message, extra);
};

module.exports = ResultSet;
