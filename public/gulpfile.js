var gulp      = require('gulp');
var rename    = require('gulp-rename');
var uglify    = require('gulp-uglify');
var requireDir = require('require-dir');
var tasks = requireDir('./tasks');
var sass = require('gulp-ruby-sass');
var minifyCss = require('gulp-minify-css');
var concat    = require('gulp-concat');

gulp.task('sass', function () {
  sass('sass/theme.sass')
  .on('error', function (err) {
    console.error('Error!', err.message);
  })
  .pipe(gulp.dest('css/dist/'));
});

