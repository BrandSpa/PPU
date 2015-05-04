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
    'coffee/mixins.coffee',

    // Helpers
    'coffee/helpers/handlebars_helpers.coffee',
    'coffee/helpers/bb_helpers.coffee',

    // App
    'coffee/app.coffee',

    // Models
    'coffee/models/categories.coffee',
    'coffee/models/curriculum.coffee',
    'coffee/models/contact.coffee',
    'coffee/models/lawyer.coffee',
    'coffee/models/post.coffee',
    'coffee/models/experencie.coffee',


    // Views
    'coffee/views/filters.coffee',

    //Categories
    'coffee/views/categories/item.coffee',
    'coffee/views/categories/list.coffee',
    'coffee/views/categories/detail.coffee',
    'coffee/views/categories/select.coffee',

    //lawyers
    'coffee/views/lawyers/item.coffee',
    'coffee/views/lawyers/list.coffee',
    'coffee/views/lawyers/detail.coffee',
    'coffee/views/lawyers/filters.coffee',
    'coffee/views/lawyers/related_category.coffee',

    //Posts
    'coffee/views/posts/item.coffee',
    'coffee/views/posts/item_featured.coffee',
    'coffee/views/posts/item_main_featured.coffee',
    'coffee/views/posts/list.coffee',
    'coffee/views/posts/list_featured.coffee',
    'coffee/views/posts/filters.coffee',
    'coffee/views/posts/detail.coffee',
    'coffee/views/posts/related.coffee',

    //experiences
    'coffee/views/experiences/item.coffee',
    'coffee/views/experiences/list.coffee',
    'coffee/views/experiences/filters.coffee',
    'coffee/views/experiences/detail.coffee',
    'coffee/views/experiences/related.coffee',

    //curriculum
    'coffee/views/curriculum/create.coffee',

    //contacts
    'coffee/views/contact/create.coffee',

    //the_actual_ch
    'coffee/views/the_actual_ch/item.coffee',
    'coffee/views/the_actual_ch/featured.coffee',
    'coffee/views/the_actual_ch/list.coffee',
    'coffee/views/the_actual_ch/filters.coffee',
    'coffee/views/the_actual_ch/detail.coffee',

    //the_actual_co
    'coffee/views/the_actual_co/item.coffee',
    'coffee/views/the_actual_co/featured.coffee',
    'coffee/views/the_actual_co/list.coffee',
    'coffee/views/the_actual_co/filters.coffee',
    'coffee/views/the_actual_co/detail.coffee',

    // Controllers
    'coffee/controllers/the_actual_ch.coffee',
    'coffee/controllers/the_actual_co.coffee',
    'coffee/controllers/posts.coffee',
    'coffee/controllers/lawyers.coffee',
    'coffee/controllers/categories.coffee',
    'coffee/controllers/experiences.coffee',
    'coffee/controllers/curriculums.coffee',
    'coffee/controllers/us.coffee',
    'coffee/controllers/probono.coffee',

    // Router
    'coffee/router.coffee'

    ])
  .pipe(coffee({bare: true}).on('error', gutil.log))
  .pipe(concat('app.js'))
  .pipe(gulp.dest('js/dist/'));
});

gulp.task('app-admin', function() {
  gulp.src([
    'coffee/main.coffee',
    'coffee/mixins.coffee',

    // Helpers
    'coffee/helpers/handlebars_helpers.coffee',
    'coffee/helpers/bb_helpers.coffee',

    // Models
    'coffee/models/categories.coffee',
    'coffee/models/lawyer.coffee',

    // Views
    'coffee/views/categories.coffee',

    // Views Lawyer
    'coffee/lawyer/article.coffee',
    'coffee/lawyer/award.coffee',
    'coffee/lawyer/academic.coffee',
    'coffee/lawyer/education.coffee',
    'coffee/lawyer/institution.coffee',
    'coffee/lawyer/language.coffee',
    'coffee/lawyer/pharase.coffee',
    'coffee/lawyer/job.coffee',
    'coffee/lawyer/recognition.coffee',



    // Views admin
    'coffee/admin/category.coffee',
    'coffee/admin/lawyer.coffee',
    'coffee/admin/post.coffee',
    'coffee/admin/the_actual.coffee',
    'coffee/admin/the_actual_create.coffee',
    'coffee/admin/the_actual_co.coffee',
    'coffee/admin/the_actual_co_create.coffee',
    'coffee/admin/gallery.coffee',
    'coffee/admin/experience.coffee',
    'coffee/admin/router.coffee'
    ])
  .pipe(coffee({bare: true}).on('error', gutil.log))
  .pipe(concat('app-admin.js'))
  .pipe(gulp.dest('js/dist/'));
});

gulp.task('sass', function () {
    gulp.src([
      'sass/*.sass',
      'css/theme.css',
      'css/libs/selectBoxIt.css',
      'bower_components/nprogress/nprogress.css'
      ])
      .pipe(sass())
      .pipe(gulp.dest('css'))
      .pipe(concat('style.css'))
      .pipe(minifyCSS())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('css/dist/'));
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
    .pipe(gulp.dest('js/dist/'));
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
    'coffee/*.coffee',
    'coffee/*/*.coffee',
    'coffee/**/**/**/*.coffee'
  ],
  [
    'app',
    'app-admin'
  ]);
});

gulp.task('default', ['watch']);
