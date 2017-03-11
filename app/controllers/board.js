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

			// make sure no other checkers are active
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

				// if we have a square to the upper left
				if( 0 < square.col  ) {

					// if the square is empty
					if( ! upLeft.checker ) {
						legalSquares.push( upLeft.index );
					}

					// if there is a checker present that we might be able to skip
					else {

						if(
							'red' === upLeft.checker.color &&
							1 < square.col &&
							1 <  square.row
						) {

							var landingSquare = board.squares[ upLeft.index - 9 ];
							if( ! landingSquare.checker ) {
								legalSquares.push( landingSquare.index );
							}
						} // end if: we can skip
					} // end if: checker present in upper left
				} // end if: square exists to upper left

				// if we have a square to the upper right
				if( 7 > square.col ) {

					// if the square is empty
					if( ! upRight.checker ) {
						legalSquares.push( upRight.index );
					}
					// if there is a checker present that we might be able to skip
					else {

						if(
							'red' === upRight.checker.color &&
							6 > square.col &&
							1 <  square.row
						) {

							var landingSquare = board.squares[ upRight.index - 7 ];
							if( ! landingSquare.checker ) {
								legalSquares.push( landingSquare.index );
							}
						} // end if: we can skip
					} // end if: checker present in upper right
				} // end if: square exists in upper right

			} // end if: black checker was clicked to initialize a move

			/**
			 * If a red checker was clicked
			 */
			if( 'red' === square.checker.color ) {

				if( 7 === square.row ) {
					return;
				}

				// if we have a square to the lower left
				if( 0 < square.col ) {

					// if the square is empty
					if( ! downLeft.checker ) {
						legalSquares.push( downLeft.index );
					}

					// if there is a checker present that we might be able to skip
					else {

						if(
							'black' === downLeft.checker.color &&
							1 < square.col &&
							6 >  square.row
						) {

							var landingSquare = board.squares[ downLeft.index + 7 ];
							if( ! landingSquare.checker ) {
								legalSquares.push( landingSquare.index );
							}
						} // end if: we can skip
					} // end if: checker present in lower left
				} // end if: square exists to lower left

				// if we have a square to the lower right
				if( 7 > square.col ) {

					// if the square is empty
					if( ! downRight.checker ) {
						legalSquares.push( downRight.index );
					}

					// if there is a checker present that we might be able to skip
					else {

						if(
							'black' === downRight.checker.color &&
							6 > square.col &&
							6 >  square.row
						) {

							var landingSquare = board.squares[ downRight.index + 9 ];
							if( ! landingSquare.checker ) {
								legalSquares.push( landingSquare.index );
							}
						} // end if: we can skip
					} // end if: checker present in lower right
				} // end if: square exists to lower right
			} // end if: red checker was clicked to initialize a move

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

			// remove any skipped checkers
			if( board.removeSkipped( _old_square, _new_square ) ) {

				// if checker was removed, increment the corresponding player's score
				if( 'black' === checker.color ) {
					checkers.status().blackScore++;
				}
				else {
					checkers.status().redScore++;
				}
			}

			// if the player needs to be doubled
			board.maybeDouble( _new_square );

			checkers.play();

		} // end: confirmCheckerMove()

		board.removeSkipped = function( _old_square, _new_square ) {

			var _skipped_square;
			var movedDistance = _old_square.index - _new_square.index;

			// if skipping to the upper left
			if( movedDistance === 18 ) {
				_skipped_square = board.squares[ _old_square.index - 9 ];
			}
			// if skipping to the upper right
			if( movedDistance === 14 ) {
				_skipped_square = board.squares[ _old_square.index - 7 ];
			}
			// if skipping to the lower left
			if( movedDistance === -14 ) {
				_skipped_square = board.squares[ _old_square.index + 7 ];
			}
			// if skipping to the lower right
			if( movedDistance === -18 ) {
				_skipped_square = board.squares[ _old_square.index + 9 ];
			}

			if( _skipped_square ) {
				_skipped_square.checker = null;
				return true;
			}

			return false;
		} // end: removeSkipped()

		board.maybeDouble = function( _new_square ) {

			if( _new_square.checker.isDouble ) {
				return;
			}

			if( 'red' == _new_square.checker.color && _new_square.row === 7 ) {
				_new_square.checker.isDouble = true;
			}

			if( 'black' == _new_square.checker.color && _new_square.row === 0 ) {
				_new_square.checker.isDouble = true;
			}
		}
	} ] ); // end: board controller
}