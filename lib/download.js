module.exports = function(data, feed) {
  if (this.isLast()) {
    feed.close();
  }
  else {
    console.log(data);
    console.log('---');
    feed.end();
  }
}