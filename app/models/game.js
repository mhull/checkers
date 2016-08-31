/**  
 * Exports the main `game` object into the main scope
 */
module.exports = game();
function game() {

	/**
	 * The main `checkers` angular module
	 */
	var angular = require( 'angular' );
	_this = angular.module( 'checkers', [] );

	_this.directive( 'game', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/game.html',
		};
	} );

	/**
	 * Register the `checkers` service with Angular
	 */
	_this.factory( 'checkers', [ function() {

		var checkers = {};
		checkers.board = {};
		checkers.activePlayer = 0; // 0: black, 1: red
		checkers.activeChecker = null;
		checkers.activeCheckerIndex = - 1;

		checkers.activePlayerColor = function() {
			return 0 === checkers.activePlayer ? 'Black' : 'Red';
		}
		checkers.play = function() {
			checkers.board().clearHighlights();
			checkers.activeCheckerIndex = -1;

			checkers.activePlayer = ( checkers.activePlayer + 1 ) % 2;
			checkers.status().message = checkers.activePlayerColor() + ' goes next.';
			checkers.status().turns++;
		}
		return checkers;
	} ] );

	/**
	 * Register the `square` service with Angular
	 */
	var square = require( '../models/square.js' );
	_this.factory( 'square', [ function() {
		return square;
	} ] );
 
	return _this;
};