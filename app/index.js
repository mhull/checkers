var game = require( './models/game.js' );

require( './controllers/status.js' )( game );
require( './controllers/board.js' )( game );
require( './controllers/square.js' )( game );
require( './controllers/checker.js' )( game );