module.exports = function( game ) {

	game.controller( 'CheckerController', [ function() {

		var checker = this;
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