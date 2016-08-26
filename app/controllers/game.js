module.exports = function( game ) {

	game.controller( 'GameController', [ function( $scope ) {

		var game = this;

		game.message = 'Welcome. Black goes first.';
		game.turns = 0;
	} ] );

	game.directive( 'game', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/game.html',
			controller: 'GameController',
			controllerAs: 'game'
		};
	} );
};