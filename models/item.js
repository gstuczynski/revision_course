var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ItemSchema = new Schema({
<<<<<<< HEAD
        engPhrase: {type: String, required: true},
        plPhrase: {type: String, required: true},
        description: String,
        creationDate: {type: Date, default: Date.now}
=======
engPhrase: {type: String, required: true},
plPhrase: {type: String, required: true},
description: String,
creationDate: {type: Date, default: Date.now}
>>>>>>> 58c6724edea466dbd6d81d241a0b784c09e096e4
});

var Model = mongoose.model('Item', ItemSchema);
module.exports = Model;