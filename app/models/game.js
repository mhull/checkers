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

	_this.activePlayer = 'black';
	_this.activeChecker = null;

	return _this;
};