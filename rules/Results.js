function Results() {
  if (!this instanceof Results) {
    return new Results();
  }
  this.error = [];
  this.warning = [];
  this.info = [];
}

module.exports = Results;
