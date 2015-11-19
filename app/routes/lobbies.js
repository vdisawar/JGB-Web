var Lobby = require('../models/Lobby');

module.exports = {

	create: function(req, res) {
		var body = req.body;
		var facebookId = req.headers['x-facebook-id'];

		var newLobby = new Lobby({
			name: body.name,
			creator: facebookId,
			users: body.users
		});

		newLobby.save(function(err, newLob){
			//Adds the lobby to the database
			if (err) {
				return res.status(400).send({message: "Lobby Not Created", error: err});
			} else {
				return res.status(200).send({message: "Lobby Created", lobby: newLob});
			}
		});
	},
	getLobbies: function(req, res) {
		//Gets all the lobbies from the database
		var body = req.body;
		var facebookId = req.headers['x-facebook-id'];

		Lobby.find({creator: facebookId, users: {$elemMatch: {userId: facebookId}}},function( err, lobbies) {
			if (err) {
				return res.status(400).send({message: "Lobbies Not Found", data: []});
			} else {
				return res.status(200).send({message: "Lobbies Found", data: lobbies});
			}
		});
	}

};
