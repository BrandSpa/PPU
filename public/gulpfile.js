var gulp      = require('gulp');
var rename    = require('gulp-rename');
var uglify    = require('gulp-uglify');
var requireDir = require('require-dir');
var tasks = requireDir('./tasks');

gulp.task('compress', function() {
  gulp.src('js/dist/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('js/dist/min'));
});

gulp.task('watch', ['sass', 'app', 'app-admin'], function(){

  gulp.watch('sass/*.sass', ['sass']);

  gulp.watch([
    'app/*.coffee',
    'app/*/*.coffee',
    'app/**/**/**/*.coffee'
  ],
  [
    'app',
    'app-admin'
  ]);
});

gulp.task('default', ['watch']);
