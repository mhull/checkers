var square = require( './square.js' );
module.exports = function( checkers ) {

	/**
	 * Board controller
	 */
	checkers.controller( 'BoardController', [ '$scope', function( $scope ) {

		$scope.squares = [];
		for( let i = 0; i < 64; i++  ) {
			$scope.squares.push( square( i ) );
		}

		/**
		 * Attempt to move a checker when clicked
		 */
		$scope.initCheckerMove = function( square ) {

			// the possible squares we could move to
			var possibleSquares = [];

			/**
			 * If a black checker was clicked
			 */
			if( 'black' === square.checker.color ) {

				if( 0 === square.row ) {
					return;
				}

				if( 0 < square.col ) {
					possibleSquares.push( square.index - 9 );
				}

				if( 7 > square.col  ) {
					possibleSquares.push( square.index - 7 );
				}
			}

			/**
			 * If a red checker was clicked
			 */
			if( 'red' === square.checker.color ) {

				if( 7 === square.row ) {
					return;
				}

				if( 0 < square.col ) {
					possibleSquares.push( square.index + 7 );
				}

				if( 7 > square.col ) {
					possibleSquares.push( square.index + 9 );
				}
			}

			for( index in possibleSquares ) {
				$scope.squares[ possibleSquares[ index ] ].highlight = true;
			}
		}

	} ] );

	checkers.controller( 'CheckerController', [ '$scope', function( $scope ) {

		$scope.color = _this.color;
	} ] );
}