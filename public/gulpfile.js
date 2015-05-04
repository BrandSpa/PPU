var gulp      = require('gulp');
var minifyCSS = require('gulp-minify-css');
var rename    = require('gulp-rename');

var uglify    = require('gulp-uglify');
var requireDir = require('require-dir');
var tasks = requireDir('./tasks');


gulp.task('app-scripts', function() {
  gulp.src([
    'js/main.js',
    'js/handlebars_helpers.js',
    'js/bb_helpers.js',
    'js/app.js',
    'js/filters.js',
    'js/categories.js',
    'js/lawyers.js',
    'js/posts.js',
    'js/experiences.js',
    'js/categories.js',
    'js/curriculum.js',
    'js/contact.js',
    'js/seo.js',
    'js/router.js'
    ])
  .pipe(concat('app-admin.js'))
  .pipe(gulp.dest('js/dist/'));
});

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
