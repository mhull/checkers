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

	_this.activePlayer = 'black';
	_this.activeChecker = null;
	_this.activeCheckerIndex = - 1;

	return _this;
};