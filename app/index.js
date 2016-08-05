var game = require( './models/game.js' );

var gameController = require( './controllers/game.js' )( game );
var boardController = require( './controllers/board.js' )( game );