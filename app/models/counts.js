'use strict';

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var countSchema = new Schema({
   count: Number
});

var Count = mongoose.model('Count', countSchema);



Count.findOne({}, function (err, count) {
    if (err) throw err;
    if (!count) {
        var newCount = new Count({
            count: 0
        });
        newCount.save(function(err) {
            if (err) throw err;
            console.log('New counter created');
        });
    }
});

module.exports = Count;
