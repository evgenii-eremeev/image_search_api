var request = require('request');
var url = require('url');

require('dotenv').config({path: '../../.env'});

function bingImageRequest(keywords, offset, callback) {
    var bingKey = process.env.BING_KEY;
    var keyBase64 = new Buffer(':' + bingKey).toString('base64');
    
    var queryUrl = url.format({
        protocol: 'https',
        host: 'api.datamarket.azure.com',
        pathname: 'Bing/Search/Image',
        search: '?$format=json' +
                '&$top=10' + 
                '&$skip=0' + 
                '&Query=%27' + keywords + '%27'
    });
     
    console.log(queryUrl);
    var options = {
      url: queryUrl,
      headers: {
        'User-Agent': 'request',
        'Authorization': 'Basic ' + keyBase64
      }
    };
     
    
    request(options, function (error, response, body) {
        if (error) {
            callback(error);
        }

        if (response.statusCode === 200) {
            callback(error, response, body);
        } else {
            console.log('Error:', response.statusCode);
        }
    
    });
}

module.exports = bingImageRequest;
