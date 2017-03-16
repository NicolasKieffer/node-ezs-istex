const path = require('path'),
  fs = require('fs'),
  sha1 = require('sha1'),
  async = require('async'),
  mkdirp = require('mkdirp');

module.exports = function(data, feed) {
  if (this.isLast()) {
    feed.close();
  } else {
    let corpusId = sha1(this.getParam("filename") + JSON.stringify(data)),
      corpusIn = path.join(this.getParam("output"), 'in', corpusId),
      corpusOut = path.join(this.getParam("output"), 'out', corpusId);
    async.each([corpusIn, corpusOut], function(item, next) {
      mkdirp(item, function(err) {
        if (err) next(err);
        next();
      });
    }, function(err) {
      if (err) throw err;
      feed.send({
        handle: data,
        corpus: {
          files: [],
          id: corpusId,
          in : corpusIn,
          out: corpusOut
        }
      });
    });
  }
}