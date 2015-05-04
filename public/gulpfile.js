var gulp      = require('gulp');
var sass      = require('gulp-ruby-sass');
var minifyCSS = require('gulp-minify-css');
var rename    = require('gulp-rename');
var gutil     = require('gulp-util');
var coffee    = require('gulp-coffee');
var concat    = require('gulp-concat');
var uglify    = require('gulp-uglify');

// Contact all javascripts files
gulp.task('app', function() {

  gulp.src([
    'app/main.coffee',
    'app/mixins.coffee',

    // Helpers
    'app/helpers/handlebars_helpers.coffee',
    'app/helpers/bb_helpers.coffee',

    // App
    'app/app.coffee',

    // Models
    'app/models/categories.coffee',
    'app/models/curriculum.coffee',
    'app/models/contact.coffee',
    'app/models/lawyer.coffee',
    'app/models/post.coffee',
    'app/models/experencie.coffee',

    // Views
    'app/views/filters.coffee',

    //Categories
    'app/views/categories/item.coffee',
    'app/views/categories/list.coffee',
    'app/views/categories/detail.coffee',
    'app/views/categories/select.coffee',

    //lawyers
    'app/views/lawyers/item.coffee',
    'app/views/lawyers/list.coffee',
    'app/views/lawyers/detail.coffee',
    'app/views/lawyers/filters.coffee',
    'app/views/lawyers/related_category.coffee',

    //Posts
    'app/views/posts/item.coffee',
    'app/views/posts/item_featured.coffee',
    'app/views/posts/item_main_featured.coffee',
    'app/views/posts/list.coffee',
    'app/views/posts/list_featured.coffee',
    'app/views/posts/filters.coffee',
    'app/views/posts/detail.coffee',
    'app/views/posts/related.coffee',

    //experiences
    'app/views/experiences/item.coffee',
    'app/views/experiences/list.coffee',
    'app/views/experiences/filters.coffee',
    'app/views/experiences/detail.coffee',
    'app/views/experiences/related.coffee',

    //curriculum
    'app/views/curriculum/create.coffee',

    //contacts
    'app/views/contact/create.coffee',

    //the_actual_ch
    'app/views/the_actual_ch/item.coffee',
    'app/views/the_actual_ch/featured.coffee',
    'app/views/the_actual_ch/list.coffee',
    'app/views/the_actual_ch/filters.coffee',
    'app/views/the_actual_ch/detail.coffee',

    //the_actual_co
    'app/views/the_actual_co/item.coffee',
    'app/views/the_actual_co/featured.coffee',
    'app/views/the_actual_co/list.coffee',
    'app/views/the_actual_co/filters.coffee',
    'app/views/the_actual_co/detail.coffee',

    // Controllers
    'app/controllers/the_actual_ch.coffee',
    'app/controllers/the_actual_co.coffee',
    'app/controllers/posts.coffee',
    'app/controllers/lawyers.coffee',
    'app/controllers/categories.coffee',
    'app/controllers/experiences.coffee',
    'app/controllers/curriculums.coffee',
    'app/controllers/us.coffee',
    'app/controllers/probono.coffee',

    // Router
    'app/router.coffee'

    ])
  .pipe(coffee({bare: true}).on('error', gutil.log))
  .pipe(concat('app.js'))
  .pipe(gulp.dest('js/dist/'));
});


gulp.task('app-admin', function() {
  gulp.src([
    'app/main.coffee',
    'app/mixins.coffee',

    // Helpers
    'app/helpers/handlebars_helpers.coffee',
    'app/helpers/bb_helpers.coffee',

    // Models
    'app/models/categories.coffee',
    'app/models/lawyer.coffee',

    // Views
    'app/views/categories.coffee',

    // Views Lawyer
    'app/views/lawyer/article.coffee',
    'app/views/lawyer/award.coffee',
    'app/views/lawyer/academic.coffee',
    'app/views/lawyer/education.coffee',
    'app/views/lawyer/institution.coffee',
    'app/views/lawyer/language.coffee',
    'app/views/lawyer/pharase.coffee',
    'app/views/lawyer/job.coffee',
    'app/views/lawyer/recognition.coffee',


    // Views admin
    'app/admin/category.coffee',
    'app/admin/lawyer.coffee',
    'app/admin/post.coffee',
    'app/admin/the_actual.coffee',
    'app/admin/the_actual_create.coffee',
    'app/admin/the_actual_co.coffee',
    'app/admin/the_actual_co_create.coffee',
    'app/admin/gallery.coffee',
    'app/admin/experience.coffee',
    'app/admin/router.coffee'
    ])
  .pipe(coffee({bare: true}).on('error', gutil.log))
  .pipe(concat('app-admin.js'))
  .pipe(gulp.dest('js/dist/'));
});

gulp.task('sass', function () {
    sass('sass')
      .on('error', function (err) {
        console.error('Error!', err.message);
      })
      .pipe(concat('app.css'))
      .pipe(gulp.dest('css/dist'));
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
