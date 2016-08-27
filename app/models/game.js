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
		checkers.activePlayer = 'black';
		checkers.activeChecker = null;
		checkers.activeCheckerIndex = - 1;
		return checkers;
	} ] );

	return _this;
};