const fs = require('fs');

module.exports = function(data, feed) {
  let self = this;
  if (!self.buffer) {
    self.buffer = [];
  }
  if (self.isLast()) {
    fs.writeFile(self.getParam("out"), JSON.stringify(self.buffer), function(err) {
      if (err) return next(err);
      feed.send(self.buffer);
      feed.close();
    });
  } else {
    if (data) {
      if (Array.isArray(data)) {
        data.forEach(function(element) {
          self.buffer.push({
            id: element.id,
            keywords: element.keywords
          });
        });
      }
    }
    feed.end();
  }
};