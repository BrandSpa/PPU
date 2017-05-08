// Dependencies
var gulp      = require('gulp');
var gutil     = require('gulp-util');
// var coffee    = require('gulp-coffee');
var concat    = require('gulp-concat');

// convert to js and contact all javascripts files
gulp.task('app-admin', function() {
  gulp.src([
    'app/main.js',
    'app/mixins.js',

    // Helpers
    'app/helpers/handlebars_helpers.js',
    'app/helpers/bb_helpers.js',

    // Models
    'app/models/categories.js',
    'app/models/lawyer.js',

    // Views
    'app/views/categories.js',

    // Views Lawyer
    'app/views/lawyer/article.js',
    'app/views/lawyer/award.js',
    'app/views/lawyer/academic.js',
    'app/views/lawyer/education.js',
    'app/views/lawyer/institution.js',
    'app/views/lawyer/language.js',
    'app/views/lawyer/pharase.js',
    'app/views/lawyer/job.js',
    'app/views/lawyer/recognition.js',

    // Views admin
    'app/admin/views/category.js',
    'app/admin/views/lawyer.js',
    'app/admin/views/gallery.js',

    //posts
    'app/admin/views/post.js',
    'app/admin/views/posts/post.js',
    'app/admin/views/posts/posts.js',
    'app/admin/views/posts/filters.js',
    'app/admin/views/posts/create.js',
    'app/admin/views/posts/edit.js',

    'app/admin/views/the_actual.js',
    'app/admin/views/the_actual_create.js',

    'app/admin/views/the_actual_co.js',
    'app/admin/views/the_actual_co_create.js',

    'app/admin/views/the_actual_pe.js',
    'app/admin/views/the_actual_pe_create.js',
    
    'app/admin/views/experience.js',
    'app/admin/router.js',

    //Controllers
    'app/admin/controllers/lawyers.js',
    'app/admin/controllers/posts.js',
    'app/admin/controllers/experiences.js',
    'app/admin/controllers/the_actual_ch.js',
    'app/admin/controllers/the_actual_co.js',
    'app/admin/controllers/the_actual_pe.js',

    ])
  // .pipe(coffee({bare: true}).on('error', gutil.log))
  .pipe(concat('app-admin.js'))
  .pipe(gulp.dest('js/dist/'));
});
