var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ItemSchema = new Schema({

        engPhrase: {type: String, required: true},
        plPhrase: {type: String, required: true},
        description: String,
        creationDate: {type: Date, default: Date.now},
        nextRepeat: Date

});

var Model = mongoose.model('Item', ItemSchema);
module.exports = Model;