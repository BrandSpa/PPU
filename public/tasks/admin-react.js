'use strict';
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');

gulp.task('admin-react', function () {
  var options = {
    insertGlobals: true,
    paths: [
      './node_modules',
      './app',
      './app/admin-react'
    ]
  };

 browserify('./app/admin-react/router.js', options)
    .transform(reactify)
    .bundle()
    .on('error', function(err) {
      console.log(err.toString());
    })
    .pipe(source('admin-react.js'))
    .pipe(gulp.dest('js/dist'));
});
