'user strict';

var Url = require(process.cwd() + "/app/models/urls.js");
var Count = require(process.cwd() + '/app/models/counts.js');
var fullUrl = require(process.cwd() + '/app/utils/fullUrl.js');


function Shortener() {

    var incCount = function(callback) {
        Count.update({}, {$inc: {count: 1}}, function (err, row) {
            if (err) {
                callback(err);   
            } else {
                callback(null);
            }
        });
    };

    var addUrl = function (req, res) {
        var url = new Url({
           original_url: req.params.url,
           short_url: fullUrl(req, req.count + 1)
        });
        
        url.save(function(err, data) {
            if (err) throw err;
            var result = {
                original_url: data.original_url,
                short_url: data.short_url
            };

            incCount(function (err) {
                if (err) throw err;
                res.json(result);
            })
            
        });
    }; // end addUrl
    
    this.getCount = function (req, res, next) {
        Count.findOne({}, function (err, data) {
            if (err) throw err;
            req.count = data.count;
            next();
        });
    }; // end getCount
    
    this.getUrl = function(req, res) {
        Url
            .findOne(
                { original_url: req.params.url }, 
                { original_url: true, short_url: true, _id: false})
            .exec(function(err, url) {
                if (err) throw err;
                url ? res.json(url) : addUrl(req, res);
            });
    }; // end getUrl
    
    this.redirect = function (req, res) {
        Url
            .findOne( { short_url: fullUrl(req, req.params.idx) })
            .exec(function(err, data) {
                if (err) throw err;

                if (data) {
                    res.redirect(data.original_url);
                } else {
                    res.json({
                       error: "Short url does't found. Use /new/{your-url} to add new url." 
                    });
                }
                
            });
    };


} // end Shortener

module.exports = Shortener;