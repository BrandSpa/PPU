'use strict';
var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var lodash = require('lodash');
var reactify = require('reactify');

// npm i --save-dev watchify browserify gulp vinyl-source-stream vinyl-buffer gulp-util gulp-sourcemaps lodash reactify

// add custom browserify options here
var customOpts = {
  entries: ['./react/app.js'],
   paths: [
      './node_modules',
      './react/',
      './react/utils',
      './react/components',
      './react/langs',
      './react/views'
    ],
    extensions: ['jsx']
};

var opts = lodash.assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));
b.transform(reactify);

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./js/dist'));
}

gulp.task('compile', bundle);