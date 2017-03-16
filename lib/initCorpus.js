const path = require('path'),
  fs = require('fs'),
  sha1 = require('sha1'),
  mkdirp = require('mkdirp');

module.exports = function(data, feed) {
  if (this.isLast()) {
    feed.close();
  } else {
    let corpusName = sha1(this.getParam("filename") + JSON.stringify(data)),
      corpusPath = path.join(this.getParam("output"), corpusName);
    mkdirp(corpusPath, function(err) {
      if (err) throw err;
      feed.send({
        handle: data,
        corpus: {
          name: corpusName,
          path: corpusPath
        }
      });
    });
  }
}