var Lobbies = require('./lobbies.js');
var Pictures = require('./pictures.js');

/**
 * Main route function to expose backend endpoints
 * @param app
 */
module.exports = function(app){
	app.post('/api/Lobbies/create', Lobbies.create),
	app.get('/api/Lobbies/get', Lobbies.getLobbies),
	app.post('/api/Lobbies/invite', Lobbies.invite),
	app.post('/api/Pictures/add', Pictures.addPicture),
	app.get('/api/Pictures/get', Pictures.getPictures)
};