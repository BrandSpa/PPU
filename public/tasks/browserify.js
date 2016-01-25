'use strict';
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var debowerify = require('debowerify');
var reactify = require('reactify');

gulp.task('browserify', function () {
  var options = {
    insertGlobals: true,
    paths: [
      './node_modules',
      './react/',
      './react/utils/',
      './react/views/'
    ]
  };

 browserify('./react/app.js', options)
    .transform(reactify)
    .bundle()
    .on('error', function(err) {
      console.log(err.toString());
    })
    .pipe(source('react-app.js'))
    .pipe(gulp.dest('js/dist'));
});


