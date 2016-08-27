var game = require( './models/game.js' );

var statusController = require( './controllers/status.js' )( game );
var boardController = require( './controllers/board.js' )( game );
var squareController = require( './controllers/square.js' )( game );
var checkerController = require( './controllers/checker.js' )( game );