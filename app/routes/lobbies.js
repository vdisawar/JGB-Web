var Lobby = require('../models/Lobby');

module.exports = {
	
	create: function(req, res) {
		var body = req.body;
		var facebookId = req.headers['X-Facebook-Token'];

		var newLobby = new Lobby({
			name: body.name,
			creator: facebookId
		});

		newLobby.save(function(err, newLob){
			//Adds the lobby to the database
			if (err) {
				return res.status(400).send({message: "Lobby Not Created " + err + " " + facebookId});
			} else {
				return res.status(200).send({message: "Lobby Created", lobby: newLob});
			}
		});
	},
	getLobbies: function(req, res) {
		//Gets all the lobbies from the database
		var body = req.body;
		var facebookId = req.headers['X-Facebook-ID'];

		Lobby.find({creator: facebookId, users: {$elemMatch: {userId: facebookId}}},function( err, lobbies) {
			if (err) {
				return res.status(400).send({message: "Lobbies Not Found", data: []});
			} else {
				return res.status(200).send({message: "Lobbies Found", data: lobbies});
			}
		});
	},
	invite: function(req, res) {
		var body = req.body;
		var facebookIdCreator = req.headers['X-Facebook-ID'];
		var userToAdd = body.user;
		var lobbyId = body.lobbyId;

		Lobby.find({_id: lobbyId},function( err, lobby) {
			if (err) {
				return res.status(400).send({message: "Lobbies Not Found"});
			} else {
				lobby.push({userId: userToAdd});
				lobby.save(function(err, newLob){
					//Adds the user to the lobby
					if (err) {
						return res.status(400).send({message: "User not added"});
					} else {
						return res.status(200).send({message: "User Added", lobby: lobby});
					}
				});
			}
		});
	}

};