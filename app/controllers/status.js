module.exports = function( game ) {

	game.controller( 'StatusController', [ function() {

		var status = this;

		status.message = 'Welcome. Black goes first.';
		status.turns = 0;
	} ] );

	game.directive( 'status', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/status.html',
			controller: 'StatusController',
			controllerAs: 'status',
		}
	} );
}