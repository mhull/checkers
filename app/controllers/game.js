module.exports = function( game ) {
	game.controller( 'GameController', [ '$scope', function( $scope ) {

		$scope.message = 'Welcome. Black goes first.';
		$scope.turns = 0;
	} ] );
};