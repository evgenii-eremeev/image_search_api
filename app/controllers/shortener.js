'user strict';

var Url = require(process.cwd() + "/app/models/urls.js");
var Count = require(process.cwd() + '/app/models/counts.js');

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
           short_url: req.count + 1
        });
        
        url.save(function(err, data) {
            if (err) throw err;
            var result = {
                original_url: data.original_url,
                short_url: data.short_url
            };
            // Count.update({}, {$inc: {count: 1}}, function (err, row) {
            //     if (err) throw err;
            //     console.log("Incremented", row);
            //     res.json(result);
            // });
            incCount(function (err) {
                if (err) throw err;
                res.json(result);
            })
            
        });
    };
    
    this.getCount = function (req, res, next) {
        Count.findOne({}, function (err, data) {
            if (err) throw err;
            req.count = data.count;
            console.log("in getCount", data.count);
            next();
        });
    };
    
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



} // end Shortener

module.exports = Shortener;