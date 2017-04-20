const fs = require('fs');

module.exports = function(data, feed) {
  let self = this;
  if (self.isLast()) {
    feed.close();
  } else {
    if (data) {
      var indexations = data,
        options = self.getParam("options") || {},
        terms = {}, // Each key is a term, his value is the list of documents containing it
        docIds = [], // List of document Ids
        result = {
          'nodes': [],
          'links': []
        },
        matrix = {}, // Matrix of "doc-doc" links (sparse matrix)
        out = options.out || './docToDoc.json',
        minLinkValue = options.minLinkValue || 0;
      // Construction of terms Object
      for (var i = 0; i < indexations.length; i++) {
        var id = indexations[i].id,
          keywords = indexations[i].keywords;
        for (var j = 0; j < keywords.length; j++) {
          var term = keywords[j].term;
          if (!terms[term]) terms[term] = [];
          terms[term].push(i);
        }
      }
      // Construction of matrix Object
      for (var key in terms) {
        // Fill it with values
        for (var i = 0; i < terms[key].length - 1; i++) {
          var idDoc1 = terms[key][i];
          for (var j = i + 1; j < terms[key].length; j++) {
            var idDoc2 = terms[key][j],
              ids = [idDoc1, idDoc2],
              id = {
                'min': Math.min(ids[0], ids[1]),
                'max': Math.max(ids[0], ids[1])
              };
            // Only half of it will be fill!
            if (!matrix[id.min + ',' + id.max]) {
              matrix[id.min + ',' + id.max] = 0;
            }
            matrix[id.min + ',' + id.max]++;
          }
        }
      }
      // Construction of Nodes object
      for (var i = 0; i < indexations.length; i++) {
        var keywords = indexations[i].keywords;
        result.nodes.push({
          'id': i,
          'data': indexations[i],
          'value': 0
        });
      }
      // Construction of matrix of links doc-doc
      for (var key in matrix) {
        var ids = key.split(',');
        if (matrix[key] >= minLinkValue) {
          result.links.push({
            'source': ids[0],
            'target': ids[1],
            'value': matrix[key]
          });
          result.nodes[ids[0]].value++;
          result.nodes[ids[1]].value++;
        }
      }

      // write data
      fs.writeFile(out, JSON.stringify(result), 'utf-8', function(err, res) {
        if (err) return feed.send(err);
        return feed.send(result);
      });
    }
  }
};