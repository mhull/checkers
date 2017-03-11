/**  
 * Exports the main `game` object into the main scope
 */
module.exports = game();
function game() {

	/**
	 * The main `checkers` angular module
	 */
	var angular = require( 'angular' );
	var game = angular.module( 'checkers', [] );

	game.directive( 'game', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/game.html',
		};
	} );

	game.directive( 'status', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/status.html',
			controller: 'StatusController',
			controllerAs: 'status',
		}
	} );

	game.directive( 'board', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/board.html',
			controller: 'BoardController',
			controllerAs: 'board',
		};
	} );

	game.directive( 'square', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/square.html',
			controller: 'SquareController',
			controllerAs: 'square',
		};
	} );

	game.directive( 'checker', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/checker.html',
			controller: 'CheckerController',
			controllerAs: 'checker',
		};
	} );

	/**
	 * Register the `checkers` service with Angular
	 */
	game.factory( 'checkers', [ function() {

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
	game.factory( 'square', [ function() {
		return square;
	} ] );
 
	return game;
};