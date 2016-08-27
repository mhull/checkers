var game = require( './models/game.js' );

var gameController = require( './controllers/game.js' )( game );
var statusController = require( './controllers/status.js' )( game );
var boardController = require( './controllers/board.js' )( game );
var squareController = require( './controllers/square.js' )( game );
var checkerController = require( './controllers/checker.js' )( game );