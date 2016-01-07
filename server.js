var express = require("express");

var app = express();

app.get('/', function (req, res) {
    res.send('working');
});

app.listen(8080, function () {
    console.log("Server running at https://url-shortener-jaycrypto.c9users.io");
});