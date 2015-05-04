// Dependencies
var gulp      = require('gulp');
var gutil     = require('gulp-util');
var coffee    = require('gulp-coffee');
var concat    = require('gulp-concat');


// convert to js and contact all javascripts files
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
