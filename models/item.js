var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*
    var d = new Date();
var today = d.toDateString()
*/


var ItemSchema = new Schema({

        engPhrase: {type: String, required: true},
        plPhrase: {type: String, required: true},
        description: String,
        creationDate: {type: Date, default: new Date().now},
        plAnsCount: {type: Number, default:0},
        engAnsCount: {type: Number, default:0}

});

var Model = mongoose.model('Item', ItemSchema);
module.exports = Model;