var url = require("url");

function fullUrl(req, idx) {
    return url.format({
        protocol: 'https',
        host: req.get('host'),
        pathname: '/' + idx
    });
}

module.exports = fullUrl;