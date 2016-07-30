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

			var upLeft = $scope.squares[ square.index - 9 ];
			var upRight = $scope.squares[ square.index - 7 ];

			var downLeft = $scope.squares[ square.index + 7  ];
			var downRight = $scope.squares[ square.index + 9 ];

			// the legal squares we could move to
			var legalSquares = [];

			/**
			 * If a black checker was clicked
			 */
			if( 'black' === square.checker.color ) {

				if( 0 === square.row ) {
					return;
				}

				// if we can move to the upper left
				if( 0 < square.col && ! upLeft.checker ) {
					legalSquares.push( upLeft.index );
				}

				// if we can move to the upper right
				if( 7 > square.col  && ! upRight.checker ) {
					legalSquares.push( upRight.index );
				}
			}

			/**
			 * If a red checker was clicked
			 */
			if( 'red' === square.checker.color ) {

				if( 7 === square.row ) {
					return;
				}

				// if we can move to the lower left
				if( 0 < square.col && ! downLeft.checker ) {
					legalSquares.push( downLeft.index );
				}

				if( 7 > square.col && ! downRight.checker ) {
					legalSquares.push( downRight.index );
				}
			}

			for( index in legalSquares ) {
				$scope.squares[ legalSquares[ index ] ].highlight = true;
			}

		} // end: initCheckerMove()

	} ] ); // end: board controller

	checkers.controller( 'CheckerController', [ '$scope', function( $scope ) {

		$scope.color = _this.color;
	} ] );
}