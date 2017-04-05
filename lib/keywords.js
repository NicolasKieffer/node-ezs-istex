const path = require('path'),
  fs = require('fs'),
  teeft = require('rd-teeft'),
  async = require('async');

module.exports = function(data, feed) {
  let self = this,
    handle = self.getParam('path', data.handle);
  if (self.isLast()) {
    feed.close();
  } else {
    if (!(handle && handle.hits)) return feed.send(data);
    async.eachSeries(handle.hits, function(hit, next) {
      fs.readFile(hit.filename, 'utf-8', function(err, res) {
        if (err) return next(err);
        hit.keywords = teeft.index(res).keywords;
        return next();
      });
    }, function(err) {
      if (err) throw err;
      data.handle = null;
      feed.send(data.corpus.id + ' : ' + data.corpus.files.length + ' Documents indexés\n');
    });
  }
};