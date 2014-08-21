var config = {
  // Base Paths
  SRC_PATH     : './src',
  DIST_PATH    : './dist',

  // General Settings
  PREPROCESSOR : 'less',                                    // Select which CSS pre-porcessor you want to use. Options: less | sass
  ENV          : 'development',                             // Options: development | production

  // SASS Settings
  get SASS_PATH() {
    return [
      this.SRC_PATH + '/styles/sass/style.scss',            // Custom styles
      this.SRC_PATH + '/styles/sass/vendors.scss',          // Vendor's styles (e.g. bootstrap, font-awesome, foundation, etc.)
    ];
  },
  get SASS_WATCH() {
    return this.SRC_PATH + '/styles/sass/**/*.scss';        // We are going to watch all *.scss files to compile
  },

  // LESS Settings
  get LESS_PATH() {
    return [
      this.SRC_PATH + '/styles/less/style.less',            // Custom styles
      this.SRC_PATH + '/styles/less/vendors.less',          // Vendor's styles (e.g. bootstrap, font-awesome, foundation, etc.)
    ];
  },
  get LESS_WATCH() {
    return this.SRC_PATH + '/styles/less/**/*.less';        // We are going to watch all *.less files to compile
  },

  // CSS Settings
  get CSS_PATH() {
    return this.DIST_PATH + '/css';                         // The folder for all compiled CSS
  },

  // Vendor's Javascript Settings
  get VENDORS_PATH() {
    return this.SRC_PATH + '/vendors/**/*.js';              // In this folder we are going to put all 3rd party libraries (e.g. jQuery, Underscore.js, etc.)
  },

  // AngularJS App
  get APP_PATH() {
    return '../app/';                                       // Here's the source code of our app. Used for sourcemapping
  },
  get APP_SRC() {
    return this.SRC_PATH + '/app/**/*.js';                  // All the JS to concat, compile and watch are here
  },
  get APP_DIST() {
    return this.DIST_PATH + '/js';                          // The folder for compiled App
  },
  get APP_CONCAT() {
    return 'app.js';                                        // Concat all JS and save it with this name
  },

  // JavaScript Settings
  get JS_PATH() {
    return this.DIST_PATH + '/js';                          // The folder for all compiled JS
  },

  // HTML Settings
  get HTML_WATCH() {
    return [
      this.SRC_PATH + '/index.html',                        // Watch the main index.html
      this.SRC_PATH + '/views/**/*.html'                    // Watch all views
    ];
  },
  get HTML_DIST() {
    return this.DIST_PATH;                                  // When build task is excecuted we put all minifyed HTML here
  },

  // Images Settings
  get IMAGES_SRC() {
    return this.SRC_PATH + '/assets/images/*';
  },
  get IMAGES_DIST() {
    return this.DIST_PATH + '/images/';                     // All compresed images here
  },

  // Icons Settings
  get ICONS_SRC() {
    return this.SRC_PATH + '/assets/icons/*';
  },
  get ICONS_DIST() {
    return this.DIST_PATH + '/icons/';                      // All compresed images here
  },

  // Fonts Settings
  get FONTS_SRC() {
    return this.SRC_PATH + '/assets/fonts/*';
  },
  get FONTS_DIST() {
    return this.DIST_PATH + '/fonts/';                      // All fonts in distribution folder
  },

  // Assets Settings
  get FILES_SRC() {
    return this.SRC_PATH + '/assets/files/*';
  },
  get FILES_DIST() {
    return this.DIST_PATH + '/files/';                      // All files in distribution folder
  },
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
