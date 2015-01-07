var gulp = require('gulp');
  sass = require('gulp-ruby-sass');
  gutil = require('gulp-util');
  coffee = require('gulp-coffee');
  concat = require('gulp-concat');


gulp.task('coffee', function() {
  gulp.src(['coffee/*.coffee', 'coffee/*/*.coffee'])
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('js'))
});


gulp.task('sass', function () {
    gulp.src('sass/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

gulp.task('plugins-scripts', function() {
  gulp.src([
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/underscore/underscore-min.js',
    'bower_components/handlebars/handlebars.min.js',
    'bower_components/backbone/backbone.js',
    'bower_components/jquery.serializeJSON/jquery.serializejson.min.js'
    ])
    .pipe(concat('dependencies.js'))
    .pipe(gulp.dest('js/dist/'))
});

gulp.task('dependencies-scripts', function() {
  gulp.src([
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/jquery-ui/jquery-ui.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/bootstrap-datepicker/js/bootstrap-datepicker.js',
    'bower_components/underscore/underscore-min.js',
    'bower_components/handlebars/handlebars.min.js',
    'bower_components/backbone/backbone.js',
    'bower_components/jquery.serializeJSON/jquery.serializejson.min.js',
    'bower_components/moment/min/moment.min.js',
    'bower_components/nprogress/nprogress.js'
    
    ])
    .pipe(concat('dependencies.js'))
    .pipe(gulp.dest('js/dist/'))
});

gulp.task('bb-scripts', function() {
  gulp.src([
    'js/main.js',
    'js/messages.js',
    'js/pictures.js',
    'js/albums.js',
    'js/app.js',
    'js/router.js'
    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('js/dist/'))
});

gulp.task('watch', ['sass', 'coffee'], function(){
  gulp.watch('sass/*.sass', ['sass']);
  gulp.watch('coffee/*.coffee', ['coffee']);
  gulp.watch('coffee/*/*.coffee', ['coffee']);
});
 
gulp.task('default', ['dependencies-scripts', 'bb-scripts','watch']);