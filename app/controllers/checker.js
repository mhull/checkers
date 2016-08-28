module.exports = function( game ) {

	game.controller( 'CheckerController', [ 'checkers', function( checkers ) {

		var checker = this;

		checker.init = function( _square ) {
			if( _square.checker ) {
				checker.color = _square.checker.color;
			}
		}

		checker.click = function( _square ) {

			if( ! checker.belongsToActivePlayer() ) {
				return;
			}

			_square.checker.active ? 
				checkers.board().cancelCheckerMove( _square ) : 
				checkers.board().initCheckerMove( _square );
		}

		checker.belongsToActivePlayer = function() {
			return 	( 0 === checkers.activePlayer && checker.color === 'black' ) ||
				( 1 === checkers.activePlayer && checker.color === 'red' );
		}
	} ] );

	game.directive( 'checker', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/checker.html',
			controller: 'CheckerController',
			controllerAs: 'checker',
		};
	} );
}