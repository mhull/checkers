module.exports = function( game ) {

	game.controller( 'SquareController', [ function() {

		var square = this;

	} ] );

	game.directive( 'square', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/square.html',
			controller: 'SquareController',
			controllerAs: 'square',
		};
	} );
};