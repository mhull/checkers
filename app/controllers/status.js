module.exports = function( game ) {

	game.controller( 'StatusController', [ 'checkers', function( checkers ) {

		var status = this;
		checkers.status = function() { return status; }

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