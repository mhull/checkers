var checker = require( './checker.js' );

/**
 * Square factory module
 *
 * @package checkers
 */
module.exports = function( i ) {

	var _this = {};

	_this.index = i;

	// set row/column 
	_this.row = Math.floor( i / 8 );
	_this.col = i % 8;

	// get/set the color 
	_this.getColor = function() {

		if( 0 === this.row % 2 ) {

			if( 0 === this.col % 2 ) {
				this.color = 'red';
			}
			else {
				this.color = 'black';
			}
		}

		else {

			if( 0 === this.col % 2 ) {
				this.color = 'black';
			}
			else {
				this.color = 'red';
			}
		}

		return this.color;

	} // end: getColor()
	_this.getColor();

	// whether or not this square begins with a checker in place
	if( 'black' === _this.color && 
		( ( i < 24 ) || ( ( 63 - i )  < 24 ) ) 
	) {
		_this.checker = checker( i );
	}

	return _this;

} // end: module.exports