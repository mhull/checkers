module.exports = function( game ) {

	/**
	 * Board controller
	 */
	game.controller( 'BoardController', [ 'checkers', 'square', function( checkers, square ) {

		var board = this;
		checkers.board = function() { return board; };

		board.squares = [];

		for( let i = 0; i < 64; i++  ) {
			board.squares.push( square( i ) );
		}

		board.squares.each = function( func ) {

			for( let i = 0; i < board.squares.length; i++ ) {
				func( board.squares[ i ] );
			}
		}

		/**
		 * Clear highlighted squares
		 */
		board.clearHighlights = function() {
			board.squares.each( function( square ) {
				square.highlight = false;
			} );
		}

		/**
		 * Attempt to move a checker when clicked
		 */
		board.initCheckerMove = function( square ) {

			// make sure no other game are active
			if( checkers.activeCheckerIndex > -1 ) {
				return;
			}

			var upLeft = board.squares[ square.index - 9 ];
			var upRight = board.squares[ square.index - 7 ];

			var downLeft = board.squares[ square.index + 7  ];
			var downRight = board.squares[ square.index + 9 ];

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
				board.squares[ legalSquares[ index ] ].highlight = true;
			}

		} // end: initCheckerMove()

		board.cancelCheckerMove = function( square ) {

			square.checker.active = false;
			checkers.activeCheckerIndex = -1;

			for( index in board.squares ) {
				board.squares[index].highlight = false;
			}
		} // end: cancelCheckerMove()

		/**
		 * Move a checker when a legal highlighted square is clicked
		 */
		board.confirmCheckerMove = function( _new_square ) {

			var index = checkers.activeCheckerIndex;
			var _old_square = board.squares[ index ];

			// unset the old checker
			var checker = _old_square.checker;
			_old_square.checker = null;

			// set the new checker
			checker.active = false;
			_new_square.checker = checker;

			board.clearHighlights();
			checkers.activeCheckerIndex = -1;

		} // end: confirmCheckerMove()

	} ] ); // end: board controller

	game.directive( 'board', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/board.html',
			controller: 'BoardController',
			controllerAs: 'board',
		};
	} );
}