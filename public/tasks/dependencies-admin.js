// Dependencies
var gulp      = require('gulp');
var gutil     = require('gulp-util');
var concat    = require('gulp-concat');

//Concat all admin dependencies
gulp.task('dependecies-admin-js', function() {
  gulp.src([

    // interaction with DOM
    'node_modules/jquery/dist/jquery.min.js',

    // Used for drag and drop
    "bower_components/jquery-ui/jquery-ui.js",

    // front-end framework
    "node_modules/bootstrap/dist/js/bootstrap.min.js",

    //serialize form data to json
    "node_modules/jquery-serializejson/jquery.serializejson.min.js",

    //Templates
    "node_modules/handlebars/dist/handlebars.min.js",

    //Utils
    "node_modules/underscore/underscore-min.js",

    // Framework MV*
    "node_modules/backbone/backbone-min.js",

    // Datepicker
    "node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js",

    // translation of datepicker
    "node_modules/bootstrap-datepicker/dist/locales/bootstrap-datepicker.es.min.js",

    // WYSIWYG Editor
    "node_modules/summernote/dist/summernote.min.js",

    // preloader style youtube
    "node_modules/nprogress/nprogress.js",

    // Notifications style osx
    "node_modules/toastr/toastr.min.js",

    // Parse, validate, manipulate, and display dates
    "bower_components/moment/min/moment.min.js",
  ])
  .pipe(concat('dependencies-admin.js'))
  .pipe(gulp.dest('js/dist/'));
});
