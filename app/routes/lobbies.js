var Lobby = require('../models/Lobby');

module.exports = {
	
	create: function(req, res) {
		var body = req.body;

		var newLobby = new Lobby({
			name: body.name,
			creator: body.token
		});

		newLobby.save(function(err, newLob){
			//Adds the lobby to the database
			if (err) {
				return res.status(400).send({message: "Lobby Not Created"});
			} else {
				return res.status(200).send({message: "Lobby Created", lobby: newLob});
			}
		});
	},
	getLobbies: function(req, res) {
		//Gets all the lobbies from the database
		var body = req.body;

		Lobby.find({creator: body.token},function( err, lobbies) {
			if (err) {
				return res.status(400).send({message: "Lobbies Not Found", data: []});
			} else {
				return res.status(200).send({message: "Lobbies Found", data: lobbies});
			}
		});
	}

};