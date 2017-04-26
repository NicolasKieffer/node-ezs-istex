const path = require('path'),
  fs = require('fs'),
  request = require('request'),
  async = require('async'),
  utils = require('li-utils');
/*
* Ce plugin récupère les hits (résultats de la requête à l'API ISTEX), puis télécharge les fichiers selon les critères demandé.  
*/
module.exports = function(data, feed) {
  let self = this;
  if (self.isLast()) {
    feed.close();
  } else {
    let handle = self.getParam('path', data.ISTEX);
    if (!(handle && handle.hits)) return feed.send(data);
    async.eachSeries(handle.hits, function(hit, next) {
      let file = utils.files.get(hit[self.getParam("key")], self.getParam("criteria"));
      if (!(file && file.uri)) return next();
      request(file.uri, function(error, response, body) {
        if (error) next(error);
        if (response.statusCode.toString()[0] !== '2') return next(response); // Si erreur http (code différent de 2XX, on la remonte
        var filePath = path.join(self.getParam("out"), hit.id + '.' + self.getParam("criteria").extension); // Calcul du chemin complet du fichier téléchargé
        fs.writeFile(filePath, body, function(err) {
          if (err) return next(err);
          hit.filename = filePath;
          next();
        });
      });
    }, function(err) {
      if (err) { 
        throw err;
      }
      feed.send(data);
    });
  }
};