var config = {
  SRC_PATH: './src',
  DIST_PATH: './dist',
  PREPROCESSOR: 'less', // Options: less | sass
  ENV: 'development', // Options: development | production
  SASS_PATH: [
    './src/styles/sass/style.scss',
    './src/styles/sass/vendors.scss',
  ],
  SASS_WATCH: './src/styles/sass/**/*.scss',
  LESS_PATH: [
    './src/styles/less/style.less',
    './src/styles/less/vendors.less',
  ],
  LESS_WATCH: './src/styles/less/**/*.less',
  CSS_PATH: './dist/css',
  VENDORS_PATH: './src/vendors/**/*.js',
  JS_PATH: './dist/js',
  APP_PATH: '../app/',
  APP_SRC: './src/app/**/*.js',
  APP_DIST: './dist/js',
  APP_CONCAT: 'app.js',
  HTML_WATCH: [
    './src/index.html',
    './src/templates/**/*.html'
  ],
  HTML_DIST: './dist/',
  IMAGES_SRC: './src/assets/images/*',
  IMAGES_DIST: './dist/images/',
  ICONS_SRC: './src/assets/icons/*',
  ICONS_DIST: './dist/icons/',
  FONTS_SRC: './src/assets/fonts/*',
  FONTS_DIST: './dist/fonts/',
  FILES_SRC: './src/assets/files/*',
  FILES_DIST: './dist/files/',
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
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    runSequence = require('gulp-run-sequence');


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
  if (config.ENV === 'development') {
    gulp.src(config.APP_SRC)
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(concat(config.APP_CONCAT, { newLine: ';' }))
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(sourcemaps.write({ includeContent: false, sourceRoot: config.APP_PATH }))
      .pipe(gulp.dest(config.APP_DIST))
      .pipe(browserSync.reload({ stream: true, once: true }));
  } else {
    gulp.src(config.APP_SRC)
      .pipe(plumber())
      .pipe(concat(config.APP_CONCAT, { newLine: ';' }))
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(gulp.dest(config.APP_DIST))
      .pipe(browserSync.reload({ stream: true, once: true }));
  }
});

gulp.task('images', function() {
  return gulp.src(config.IMAGES_SRC)
    .pipe(imagemin())
    .pipe(gulp.dest(config.IMAGES_DIST))
    .pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task('fonts', function() {
  return gulp.src(config.FONTS_SRC)
    .pipe(gulp.dest(config.FONTS_DIST))
    .pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task('icons', function() {
  return gulp.src(config.ICONS_SRC)
    .pipe(imagemin())
    .pipe(gulp.dest(config.ICONS_DIST))
    .pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task('files', function() {
  return gulp.src(config.FILES_SRC)
    .pipe(gulp.dest(config.FILES_DIST))
    .pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task('html', function() {
  return gulp.src(config.HTML_WATCH, { base: config.SRC_PATH })
    .pipe(htmlmin({ removeComments: true, collapseWhitespace: true }))
    .pipe(gulp.dest(config.HTML_DIST));
});

gulp.task('reload', function() {
  browserSync.reload({ once: true });
});

gulp.task('watch', function() {
  gulp.watch(config.HTML_WATCH, ['reload']);
  gulp.watch(config.APP_SRC, ['app']);
  gulp.watch(config.VENDORS_PATH, ['js']);
  gulp.watch(config.IMAGES_SRC, ['images']);
  gulp.watch(config.FONTS_SRC, ['fonts']);
  gulp.watch(config.ICONS_SRC, ['icons']);
  gulp.watch(config.FILES_SRC, ['files']);

  if (config.PREPROCESSOR === 'sass')
    gulp.watch(config.SASS_WATCH, ['sass']);
  else
    gulp.watch(config.LESS_WATCH, ['less']);
});

gulp.task('default', function() {
  runSequence([config.PREPROCESSOR, 'js', 'app', 'images', 'fonts', 'icons', 'files'], 'browser-sync', 'watch');
});

gulp.task('build', [config.PREPROCESSOR, 'js', 'app', 'images', 'fonts', 'icons', 'files', 'html']);
