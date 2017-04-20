/*jshint node:true, laxcomma:true*/
'use strict';

module.exports =  {
  ISTEXCorpus: require('./lib/corpus.js'),
  ISTEXQuery: require('./lib/query.js'),
  ISTEXHarvest: require('./lib/harvest.js'),
  ISTEXRequest: require('./lib/request.js'),
  ISTEXHits: require('./lib/hits.js'),
  ISTEXDownload: require('./lib/download.js'),
  ISTEXKeywords: require('./lib/keywords.js'),
  ISTEXRegroup: require('./lib/regroup.js'),
  ISTEXGraphs: require('./lib/graphs.js'),
  ISTEXMods: require('./lib/mods.js'),
  ISTEXParseXML: require('./lib/parse-xml.js')
}
