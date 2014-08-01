var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    ngAnnotate = require('gulp-ng-annotate'),
    rename = require("gulp-rename"),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: ['src', 'dist']
    }
  });
});

gulp.task('sass', function() {
  gulp.src('src/styles/sass/**/*.scss')
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
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('js', function() {
  gulp.src('src/vendors/**/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task('app', function() {
  gulp.src('src/app/**/*.js')
    .pipe(plumber())
    .pipe(concat('app.js', { newLine: ';' }))
    .pipe(ngAnnotate({ single_quotes: true }))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({ stream: true, once: true }));
});

gulp.task('reload', function() {
  browserSync.reload({ once: true });
});

gulp.task('default', ['sass', 'js', 'app', 'browser-sync'], function() {
  gulp.watch(['src/index.html', 'src/tamplates/**/*.html'], ['reload']);
  gulp.watch(['src/app/**/*.js'], ['app']);
  gulp.watch(['src/vendors/**/*.js'], ['js']);
  gulp.watch(['src/styles/**/*.scss'], ['sass']);
});
