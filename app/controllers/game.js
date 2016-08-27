module.exports = function( game ) {

	game.controller( 'GameController', [ function( $scope ) {

		var game = this;

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