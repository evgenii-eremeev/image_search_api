'use strict';

var express = require("express");
var mongoose = require("mongoose");
var Shortener = require("./app/controllers/shortener.js");

var app = express();

mongoose.connect('mongodb://localhost:27017/url_shortener');

var shortener = new Shortener();

app.get('/:url', shortener.getCount, shortener.getUrl);

app.listen(8080, function () {
    console.log("Server running at https://url-shortener-jaycrypto.c9users.io");
});