// Dependencies
var gulp      = require('gulp');
var gutil     = require('gulp-util');
var coffee    = require('gulp-coffee');
var concat    = require('gulp-concat');

// convert to js and contact all javascripts files
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
    'app/admin/router.coffee',

    //Controllers
    'app/admin/controllers/lawyers.coffee',
    'app/admin/controllers/posts.coffee',
    'app/admin/controllers/the_actual_ch.coffee',
    ])
  .pipe(coffee({bare: true}).on('error', gutil.log))
  .pipe(concat('app-admin.js'))
  .pipe(gulp.dest('js/dist/'));
});
