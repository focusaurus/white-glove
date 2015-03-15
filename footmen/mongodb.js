var events = require("events");
var MongoClient = require("mongodb").MongoClient;

function MongodbFootman(url, collection) {
  events.EventEmitter.call(this);
  this.url = url;
  this.collection = collection;
}
MongodbFootman.prototype = new events.EventEmitter();

MongodbFootman.prototype.start = function start() {
  var self = this;
  MongoClient.connect(this.url, function (error, db) {
    if (error) {
      self.emit("error", error);
      return;
    }
    db.collection(self.collection).find().each(function (error2, doc) {
      if (error2) {
        self.emit("error", error2);
        return;
      }
      if (!doc) {
        db.close();
        self.emit("end");
        return;
      }
      self.emit("object", doc);
    });
  });
};

module.exports = MongodbFootman;
