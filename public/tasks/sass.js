// Dependencies
var gulp      = require('gulp');
var sass = require('gulp-ruby-sass');
var minifyCss = require('gulp-minify-css');
var concat    = require('gulp-concat');

gulp.task('sass', function () {
  sass('sass')
  .on('error', function (err) {
    console.error('Error!', err.message);
  })
  .pipe(minifyCss())
  .pipe(concat('app.css'))
  .pipe(gulp.dest('css/dist'));
});
