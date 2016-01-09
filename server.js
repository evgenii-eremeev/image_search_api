'use strict';

var express = require("express");
var mongoose = require("mongoose");
var Shortener = require("./app/controllers/shortener.js");

var app = express();

mongoose.connect('mongodb://localhost:27017/shorts');

var shortener = new Shortener();

app.get('/', function(req, res) {
    res.sendFile(process.cwd() + '/public/index.html');
});

app.get('/new/:url(*)', shortener.getCount, shortener.getUrl);

app.get('/:idx', shortener.redirect);


var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("Server running at https://url-shortener-jaycrypto.c9users.io");
});