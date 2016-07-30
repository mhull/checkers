/**
 * Checker factory module
 *
 * @package checkers
 */
module.exports = function ( i ) {

	var _this = {};

	_this.color = ( i < 24 ) ? 'red' : 'black';
	_this.active = false;

	return _this;
};