module.exports = function( game ) {

	game.controller( 'CheckerController', [ '$scope', function( $scope ) {

		$scope.color = _this.color;
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