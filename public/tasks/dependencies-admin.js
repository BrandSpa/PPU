// Dependencies
var gulp      = require('gulp');
var gutil     = require('gulp-util');
var concat    = require('gulp-concat');


gulp.task('dependecies-admin-js', function() {
  gulp.src([
    'bower_components/jquery/dist/jquery.min.js',

    "bower_components/jquery-ui/jquery-ui.js",

    "node_modules/bootstrap/dist/js/bootstrap.min.js",

    "bower_components/jquery.serializeJSON/jquery.serializejson.min.js",

    "node_modules/handlebars/dist/handlebars.min.js",

    "node_modules/underscore/underscore-min.js",

    "node_modules/backbone/backbone-min.js",

    "bower_components/bootstrap-datepicker/js/bootstrap-datepicker.js",

    "bower_components/bootstrap-datepicker/js/locales/bootstrap-datepicker.es.js",

    "node_modules/summernote/dist/summernote.min.js",

    "bower_components/moment/min/moment.min.js",

    "node_modules/nprogress/nprogress.js",

    "node_modules/toastr/toastr.min.js"
  ])
  .pipe(concat('dependencies-admin.js'))
  .pipe(gulp.dest('js/dist/'));
});
