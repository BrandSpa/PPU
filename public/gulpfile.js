var gulp = require('gulp');
  sass = require('gulp-ruby-sass');
  minifyCSS = require('gulp-minify-css');
  rename = require('gulp-rename');
  gutil = require('gulp-util');
  coffee = require('gulp-coffee');
  concat = require('gulp-concat');
  uglify = require('gulp-uglify');

gulp.task('app', function() {
  gulp.src([
    'coffee/main.coffee',
    'coffee/handlebars_helpers.coffee',
    'coffee/bb_helpers.coffee',
    'coffee/app.coffee',
    'coffee/filters.coffee',
    'coffee/categories.coffee',
    'coffee/lawyers.coffee',
    'coffee/posts.coffee',
    'coffee/experiences.coffee',
    'coffee/categories.coffee',
    'coffee/curriculum.coffee',
    'coffee/contact.coffee',
    'coffee/seo.coffee',
    'coffee/router.coffee'
    ])
  .pipe(coffee({bare: true}).on('error', gutil.log))
  .pipe(concat('app.js'))
  .pipe(gulp.dest('js/dist/'))
});

gulp.task('app-admin', function() {
  gulp.src([
    'coffee/main.coffee',
    'coffee/handlebars_helpers.coffee',
    'coffee/bb_helpers.coffee',
    'coffee/categories.coffee',
    'coffee/lawyer/article.coffee',
    'coffee/lawyer/award.coffee',
    'coffee/lawyer/academic.coffee',
    'coffee/lawyer/education.coffee',
    'coffee/lawyer/institution.coffee',
    'coffee/lawyer/language.coffee',
    'coffee/lawyer/pharase.coffee',
    'coffee/lawyer/job.coffee',
    'coffee/lawyer/recognition.coffee',
    'coffee/lawyers.coffee',
    'coffee/admin/category.coffee',
    'coffee/admin/lawyer.coffee',
    'coffee/admin/post.coffee',
    'coffee/admin/gallery.coffee',
    'coffee/admin/experience.coffee',
    'coffee/admin/router.coffee'
    ])
  .pipe(coffee({bare: true}).on('error', gutil.log))
  .pipe(concat('app-admin.js'))
  .pipe(gulp.dest('js/dist/'))
});

gulp.task('sass', function () {
    gulp.src('sass/*.sass')
      .pipe(sass())
      .pipe(gulp.dest('css'))
});

gulp.task('stylesheets', function() {
  gulp.src([
    'css/theme.css',
    'css/libs/selectBoxIt.css',
    'bower_components/nprogress/nprogress.css'
    ])
    .pipe(concat('style.css'))
    .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('css/dist/'))
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
    'bower_components/moment/min/moment-with-locales.min.js',
    'bower_components/nprogress/nprogress.js',
    'js/libs/jquery.selectBoxIt.min.js',
    ])
    .pipe(concat('dependencies.js'))
    .pipe(gulp.dest('js/dist/'))
});

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
  .pipe(gulp.dest('js/dist/'))
});

gulp.task('compress', function() {
  gulp.src('js/dist/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('js/dist/min'))
});

gulp.task('watch', ['sass', 'app', 'app-admin'], function(){
  gulp.watch('sass/*.sass', ['sass', 'stylesheets']);
  gulp.watch(['coffee/*.coffee', 'coffee/*/*.coffee'], ['app', 'app-admin']);
});
 
gulp.task('default', ['watch']);