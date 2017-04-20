const path = require('path'),
  fs = require('fs'),
  teeft = require('rd-teeft'),
  async = require('async');

module.exports = function(data, feed) {
  let self = this;
  if (self.isLast()) {
    feed.close();
  } else {
    let handle = self.getParam('path', data.ISTEX),
      results = [];
    if (!(handle && handle.hits)) return feed.send(data);
    async.eachSeries(handle.hits, function(hit, next) {
      fs.readFile(hit.filename, 'utf-8', function(err, res) {
        if (err) return next(err);
        hit.keywords = teeft.index(res).keywords;
        results.push({
          'id': hit.id,
          'keywords': hit.keywords
        });
        return next();
      });
    }, function(err) {
      if (err) console.log(err);
      feed.send(results);
    });
  }
};