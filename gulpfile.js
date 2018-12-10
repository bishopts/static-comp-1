const gulp         = require('gulp');
const sass         = require('gulp-sass');
const prefix       = require('gulp-autoprefixer');
const browserSync  = require('browser-sync').create();
const imagemin     = require('gulp-imagemin');

function css() {
  return gulp.src('src/assets/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('src/assets/css'))
    .pipe(browserSync.stream());
};

function serve() {
  browserSync.init({
    server: "./src"
  })
};

// This function is a wonky fix. Calling browserSync.reload in the watch task 
// quit reloading after one refresh. This function seemed to solve it. Idk.
function reload(cb) {
  browserSync.reload();
  cb();
}

function copy() {
  return gulp.src([
    'src/**',
    '!src/assets/sass/**',
    '!src/images/**'
  ])
    .pipe(gulp.dest('dist/'));
};

function images() {
  return gulp.src('src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
}

exports.default = serve;
exports.build = gulp.series(images, copy);

gulp.watch('src/assets/sass/**', { events: 'all' }, css);
gulp.watch('src/*.html', { events: 'all' }, reload);