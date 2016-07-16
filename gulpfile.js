'use strict';

/**
 * Dependencies
 */
var gulp = require( 'gulp' ),
    gutil = require( 'gulp-util' ),
    browserify = require( 'browserify' ),
    watchify = require( 'watchify' ),
    sourcemaps = require( 'gulp-sourcemaps' ),
    source = require( 'vinyl-source-stream' );

/**
 * Configs
 */

// add args to the default watchify args
var watchifyArgs =  Object.assign( {}, {
    entries: [ './app/index.js' ]
}, watchify.args );

// watchify reduces build time for browserify
var b = watchify( browserify( watchifyArgs ) );

/**
 * Tasks
 */

// default task for `gulp` command
gulp.task( 'default', [ 'browserify' ], function() {

} );

/**
 * Watchify/Browserify task
 *
 * @see https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
 */
function bundle() {

	return b
	    .bundle()
	    // log errors if they happen
	    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
	    .pipe( source( 'checkers.js' ) )
	    .pipe( sourcemaps.write( './' ) )
	    .pipe( gulp.dest( 'dist/' ) );
}

// main bundle gulp task
gulp.task( 'browserify', bundle  );

// watchify update task to quickly re-build browserify bundle
b.on( 'update', bundle );
