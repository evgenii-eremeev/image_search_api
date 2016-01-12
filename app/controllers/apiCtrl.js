'use strict';

var bingImageRequest = require(process.cwd() + '/app/utils/bingImageRequest.js');
var Query = require(process.cwd() + '/app/models/query.js');

function Api() {

    this.imageSearch = function(req, res) {
        var keywords = req.params.keywords;
        var query = new Query({
            term: keywords
        });
        query.save();
        
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
    }; // end .imageSearch
    
    this.recent = function (req, res) {
        Query.find({}, {term: true, when: true, _id: false})
             .limit(25)
             .sort({ when: -1 })
             .exec(function (err, data) {
                 if (err) throw err;
                 res.json(data);
             });
    }; // end recent
}

module.exports = Api;