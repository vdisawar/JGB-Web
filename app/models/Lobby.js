var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Lobby schema

var LobbySchema = new Schema({
    createdAt: {type: Date, default: Date.now},
    name: {type: String, required: true},
    creator: {type: String, required: true}
});

module.exports = mongoose.model('Lobby', LobbySchema);