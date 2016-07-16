var checkers = require( './checkers.js' );
var square = require( './square.js' );

/**
 * Board controller
 */
checkers.controller( 'BoardController', [ '$scope', function( $scope ) {

	$scope.squares = [];
	for( let i = 0; i < 64; i++  ) {
		$scope.squares.push( square( i ) );
	}

	$scope.draw = function() {

	}

} ] );
