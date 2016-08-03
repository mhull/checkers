var square = require( './square.js' );
module.exports = function( checkers ) {

	checkers.activeCheckerIndex = - 1;

	/**
	 * Board controller
	 */
	checkers.controller( 'BoardController', [ '$scope', function( $scope ) {

		$scope.squares = [];
		for( let i = 0; i < 64; i++  ) {
			$scope.squares.push( square( i ) );
		}

		$scope.squares.each = function( func ) {

			for( let i = 0; i < $scope.squares.length; i++ ) {
				func( $scope.squares[ i ] );
			}
		}

		/**
		 * Clear highlighted squares
		 */
		$scope.clearHighlights = function() {
			$scope.squares.each( function( square ) {
				square.highlight = false;
			} );
		}

		/**
		 * Attempt to move a checker when clicked
		 */
		$scope.initCheckerMove = function( square ) {

			// make sure no other checkers are active
			if( checkers.activeCheckerIndex > -1 ) {
				return;
			}

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

				// if we can move to the lower right
				if( 7 > square.col && ! downRight.checker ) {
					legalSquares.push( downRight.index );
				}
			}

			// set this checker as active
			if( legalSquares.length > 0 ) {
				square.checker.active = true;
				checkers.activeCheckerIndex = square.index;
			}

			// highlight any legal squares
			for( index in legalSquares ) {
				$scope.squares[ legalSquares[ index ] ].highlight = true;
			}

		} // end: initCheckerMove()

		$scope.cancelCheckerMove = function( square ) {

			square.checker.active = false;
			checkers.activeCheckerIndex = -1;

			for( index in $scope.squares ) {
				$scope.squares[index].highlight = false;
			}
		} // end: cancelCheckerMove()

		/**
		 * Move a checker when a legal highlighted square is clicked
		 */
		$scope.confirmCheckerMove = function( _new_square ) {

			var index = checkers.activeCheckerIndex;
			var _old_square = $scope.squares[ index ];

			// unset the old checker
			var checker = _old_square.checker;
			_old_square.checker = null;

			// set the new checker
			checker.active = false;
			_new_square.checker = checker;

			$scope.clearHighlights();
			checkers.activeCheckerIndex = -1;

		} // end: confirmCheckerMove()

	} ] ); // end: board controller

	checkers.controller( 'CheckerController', [ '$scope', function( $scope ) {

		$scope.color = _this.color;
	} ] );
}