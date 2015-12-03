var mongoose = require('mongoose');
var Schema = mongoose.Schema;




//Picture schema

var pictureSchema = new Schema({
    createdAt: {type: Date, default: Date.now},
    lobbyId: {type: String, required: true},
    name: {type: String, required: true},
    picture: []
});

module.exports = mongoose.model('Picture', pictureSchema);