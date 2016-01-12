'use strict';

var express = require("express");
var mongoose = require("mongoose");
var ApiCtrl = require(process.cwd() + '/app/controllers/apiCtrl.js');
require('dotenv').load();

var app = express();

//mongoose.connect('mongodb://localhost:27017/shorts');

var apiCtrl = new ApiCtrl();

app.get('/', function(req, res) {
    res.sendFile(process.cwd() + '/public/index.html');
});

app.get('/api/imagesearch/:keywords', apiCtrl.imageSearch);


var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("Server running at https://image-search-api-jaycrypto.c9users.io");
});