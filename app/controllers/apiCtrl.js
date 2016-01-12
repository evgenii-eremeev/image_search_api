'use strict';

var bingImageRequest = require(process.cwd() + '/app/utils/bingImageRequest.js');


function Api() {
    this.imageSearch = function(req, res) {
        var keywords = req.params.keywords;
        var offset = +req.query.offset || 10;
        bingImageRequest(keywords, offset, function (error, request, body) {
            var results = JSON.parse(body).d.results;
            var pics = results.map(function(pic) {
                return {
                    url: pic.MediaUrl,
                    snippet: pic.Title,
                    thumbnail: pic.Thumbnail.MediaUrl,
                    context: pic.SourceUrl  
                };
            });
            res.send(pics); 
        });
    };
}

module.exports = Api;