'use strict';

var express = require("express");
var mongoose = require("mongoose");
require('dotenv').load();

var app = express();

//mongoose.connect('mongodb://localhost:27017/shorts');


app.get('/', function(req, res) {
    res.sendFile(process.cwd() + '/public/index.html');
});


var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("Server running at https://image-search-api-jaycrypto.c9users.io");
});