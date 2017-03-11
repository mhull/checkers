module.exports = function( game ) {

	game.controller( 'SquareController', [ 'checkers',  function( checkers ) {

		var square = this;
		square.class = function( _square ) {
			return 'square ' + _square.color + ' row-' + _square.row + ' col-' + _square.col;
		}
		square.click = function( _square ) {
			_square.highlight ? checkers.board().confirmCheckerMove( _square ) : null
		}

	} ] );
};