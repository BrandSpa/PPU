// Dependencies
var gulp      = require('gulp');
var gutil     = require('gulp-util');
var concat    = require('gulp-concat');


gulp.task('dependencies-app-js', function() {
  gulp.src([
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/jquery-ui/jquery-ui.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/bootstrap-datepicker/js/bootstrap-datepicker.js',
    'bower_components/underscore/underscore-min.js',
    'bower_components/handlebars/handlebars.min.js',
    'bower_components/backbone/backbone.js',
    'bower_components/jquery.serializeJSON/jquery.serializejson.min.js',
    'bower_components/moment/min/moment-with-locales.min.js',
    'bower_components/nprogress/nprogress.js',
    'js/libs/jquery.selectBoxIt.min.js',
    ])
    .pipe(concat('dependencies.js'))
    .pipe(gulp.dest('js/dist/'));
});
