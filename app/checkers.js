/**  
 * Exports the main `checkers` object into the main scope
 */
module.exports = checkers();
function checkers() {

	/**
	 * The main `checkers` angular module
	 */
	var angular = require( 'angular' );
	_this = angular.module( 'checkers', [] );

	_this.activeChecker = null;

	return _this;
};