'use strict';
var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');

gulp.task('concact_dependencies', function() {
  gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'css/default.css',
    'css/dist/theme.css',
    'node_modules/font-awesome/css/font-awesome.css',
    'node_modules/loaders.css/loaders.css',
    'node_modules/ionicons/css/ionicons.css'
  ])
  .pipe(concat('dependencies.css'))
  .pipe(gulp.dest('css/dist'));
});
