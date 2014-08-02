var config = {
  SRC_PATH: 'src',
  DIST_PATH: 'dist',
  PREPROCESSOR: 'sass',
  SASS_PATH: [
    'src/styles/sass/style.scss',
    'src/styles/sass/vendors.scss',
  ],
  SASS_WATCH: 'src/styles/sass/**/*.scss',
  LESS_PATH: [
    'src/styles/less/style.less',
    'src/styles/less/vendors.less',
  ],
  LESS_WATCH: 'src/styles/less/**/*.less',
  CSS_PATH: 'dist/css',
  VENDORS_PATH: 'src/vendors/**/*.js',
  JS_PATH: 'dist/js',
  APP_SRC: 'src/app/**/*.js',
  APP_DIST: 'dist/js',
  APP_CONCAT: 'app.js',
  HTML_WATCH: [
    'src/index.html',
    'src/templates/**/*.html'
  ]
};

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    ngAnnotate = require('gulp-ng-annotate'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    sass = require('gulp-ruby-sass'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: [
        config.SRC_PATH,
        config.DIST_PATH
      ],
    }
  });
});

gulp.task('sass', function() {
  gulp.src(config.SASS_PATH)
    .pipe(plumber())
    .pipe(sass({ compass: true, lineNumbers: true }))
    .pipe(autoprefixer(
      'last 2 version',
      '> 1%',
      'ie 8',
      'ie 9',
      'ios 6',
      'android 4'
    ))
    .pipe(gulp.dest(config.CSS_PATH))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('less', function() {
  gulp.src(config.LESS_PATH)
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer(
      'last 2 version',
      '> 1%',
      'ie 8',
      'ie 9',
      'ios 6',
      'android 4'
    ))
    .pipe(gulp.dest(config.CSS_PATH))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('js', function() {
  gulp.src(config.VENDORS_PATH)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.JS_PATH))
    .pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task('app', function() {
  gulp.src(config.APP_SRC)
    .pipe(plumber())
    .pipe(concat(config.APP_CONCAT, { newLine: ';' }))
    .pipe(ngAnnotate())
    .pipe(gulp.dest(config.APP_DIST))
    .pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task('reload', function() {
  browserSync.reload({ once: true });
});

if (config.PREPROCESSOR === 'sass') {
  // Running with SASS preprocessor
  gulp.task('default', ['sass', 'js', 'app', 'browser-sync'], function() {
    gulp.watch(config.HTML_WATCH, ['reload']);
    gulp.watch(config.APP_SRC, ['app']);
    gulp.watch(config.VENDORS_PATH, ['js']);
    gulp.watch(config.SASS_WATCH, ['sass']);
  });
} else {
  // Running with LESS preprocessor
  gulp.task('default', ['less', 'js', 'app', 'browser-sync'], function() {
    gulp.watch(config.HTML_WATCH, ['reload']);
    gulp.watch(config.APP_SRC, ['app']);
    gulp.watch(config.VENDORS_PATH, ['js']);
    gulp.watch(config.LESS_WATCH, ['less']);
  });
}
