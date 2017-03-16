const path = require('path'),
  fs = require('fs'),
  request = require('request'),
  async = require('async'),
  utils = require('li-utils');

module.exports = function(data, feed) {
  let self = this,
    handle = self.getParam('path', data.handle);
  if (self.isLast()) {
    feed.close();
  } else {
    async.eachSeries(handle.hits, function(hit, next) {
      let file = utils.files.get(hit.fulltext, self.getParam("criteria"));
      if (file && file.uri) {
        request(file.uri, function(error, response, body) {
          if (error) next(error);
          if (response.statusCode.toString()[0] !== '2') return next(response); // Si erreur http (code différent de 2XX, on la remonte
          var filePath = path.join(data.corpus.path, hit.id + '.' + self.getParam("criteria").extension); // Calcul du chemin complet du fichier téléchargé
          fs.writeFile(filePath, body, function(err) {
            hit.filename = (err) ? null : filePath;
            next();
          });
        });
      }
    }, function(err) {
      if (err) throw err;
      feed.send(JSON.stringify(data) + '\n');
    });
  }
};