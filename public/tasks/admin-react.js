'use strict';
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('babelify');

gulp.task('admin-react', function () {
  var options = {
    insertGlobals: true,
    paths: [
      './node_modules',
      './admin-react'
    ]
  };

 browserify('./admin-react/router.js', options)
    .transform("babelify", {presets: ["es2015", "react"]})
    .bundle()
    .on('error', function(err) {
      console.log(err.toString());
    })
    .pipe(source('admin-react.js'))
    .pipe(gulp.dest('js/dist'));
});

gulp.task('admin:watch', function () {
  gulp.watch('./admin-react/**/*.js', ['admin-react']);
});
