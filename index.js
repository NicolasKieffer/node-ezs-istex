/*jshint node:true, laxcomma:true*/
'use strict';

module.exports = {
  ISTEXQuery: require('./lib/query.js'),
  ISTEXHarvest: require('./lib/harvest.js'),
  ISTEXRequest: require('./lib/request.js'),
  ISTEXHits: require('./lib/hits.js'),
  ISTEXDownload: require('./lib/download.js'),
  ISTEXKeywords: require('./lib/keywords.js'),
  ISTEXInitCorpus: require('./lib/initCorpus.js')
}