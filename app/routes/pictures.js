var Picture = require('../models/Picture');

module.exports = {
	addPicture: function (req, res) {
		var body = req.body;

		var newPicture = new Picture({
			name: body.name,
			lobbyId: body.lobbyId,
			picture: body.picture,
			createdAt: body.timestamp 
		});

		newPicture.save(function(err, newPic){
			//Adds the picture to the database
			console.log("Error" + err);
			if (err) {
				return res.status(400).send({message: "Picture Not Created"});
			} else {
				return res.status(200).send({message: "Picture Created", picture: newPic});
			}
		});
	},
	getPictures: function (req, res) {
		//Gets the pictures for a particular lobby from the database
		var body = req.body;

		Picture.find({lobbyId: body.lobbyId}, function( err, pictures) {
			if (err) {
				return res.status(400).send({message: "Pictures Not Found", data: []});
			} else {
				return res.status(200).send({message: "Pictures Found", data: pictures});
			}
		});
	}
};