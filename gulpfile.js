// Convention names
var development = 'DEV',
    distribution = 'DIST',
    lessLang = 'less',
    sassLang = 'sass';

// Environment variables
var ENV = development,
    PREPROCESSOR = lessLang,
    PORT = 7070;

// Gulp plugins
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'browser-sync', 'wiredep']
});

// Connects with a local server (development)
gulp.task('connect', function() {
  var routes = {
    // Should be '/bower_components': '../bower_components'
    // Waiting for https://github.com/shakyShane/browser-sync/issues/308
    '/bower_components': 'bower_components'
  };

  $.browserSync({
    port: PORT,
    server: {
      baseDir: ['src', 'dist'],
      routes: routes
    },
  });
});

// Compiles (uglifies) all 3rd party libraries in src/vendors
gulp.task('compileCustomeVendors', function() {
  return gulp.src('src/vendors/**/*.js')
    .pipe($.plumber())
    .pipe($.newer('dist/js'))
    .pipe($.concat('custom-vendors.min.js', { newLine: ';' }))
    .pipe($.uglify({ preserveComments: 'some' }))
    .pipe(gulp.dest('dist/js'))
    .pipe($.size({ title: 'compileCustomeVendors', showFiles: true }))
    .pipe($.browserSync.reload({ stream: true }));
});

// Compiles, concats, annotates and uglifies the whole app
gulp.task('compileApp', function() {
  return gulp.src('src/app/**/*.js')
    .pipe($.plumber())
    .pipe($.newer('dist/js'))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(ENV === development, $.sourcemaps.init()))
    .pipe($.concat('app.min.js', { newLine: ';' }))
    .pipe($.ngAnnotate())
    .pipe($.uglify({ preserveComments: 'some' }))
    .pipe($.if(ENV === development, $.sourcemaps.write('../maps', { includeContent: false, sourceRoot: '/app' })))
    .pipe(gulp.dest('dist/js'))
    .pipe($.size({ title: 'compileApp', showFiles: true }))
    .pipe($.browserSync.reload({ stream: true }));
});

// Compiles, auto-prefixes and minifies all .less files
gulp.task('less', function() {
  // NOTE: if I return the stream, when there is an error, everything breaks
  gulp.src('src/styles/less/{custom-vendors,style}.less')
    .pipe($.plumber())
    .pipe($.newer('dist/css'))
    .pipe($.less())
    .pipe($.autoprefixer(
      'last 2 version',
      '> 1%',
      'ie 8',
      'ie 9',
      'ios 6',
      'android 4'
    ))
    .pipe($.if(ENV !== development, $.csso()))
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'))
    .pipe($.size({ title: 'less', showFiles: true }))
    .pipe($.browserSync.reload({ stream: true }));
});

// Compiles, auto-prefixes and minifies all .scss files
gulp.task('sass', function() {
  return gulp.src('src/styles/sass/{custom-vendors,style}.scss')
    .pipe($.plumber())
    .pipe($.newer('dist/css'))
    .pipe($.rubySass({
      compass: true,
      lineNumbers: ENV === development,
      precision: 6,
    }))
    .pipe($.autoprefixer(
      'last 2 version',
      '> 1%',
      'ie 8',
      'ie 9',
      'ios 6',
      'android 4'
    ))
    .pipe($.if(ENV !== development, $.csso()))
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'))
    .pipe($.size({ title: 'sass', showFiles: true }))
    .pipe($.browserSync.reload({ stream: true }));
});

// Just copies all assets in the dist folder
gulp.task('copyAssets', function() {
  return gulp.src('src/assets/{images,fonts,icons,misc}/**/*')
    .pipe($.plumber())
    .pipe($.newer('dist/'))
    .pipe(gulp.dest('dist/'))
    .pipe($.size({ title: 'copyAssets', showFiles: true }))
    .pipe($.browserSync.reload({ stream: true }));
});

// Put all bower fonts into dist
gulp.task('copyFonts', function() {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff,otf}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size({ title: 'copyFonts', showFiles: true }));
});

// Generates AngularJS modules, which pre-load your HTML code into the $templateCache
// This way AngularJS doesn't need to request the actual HTML files anymore
gulp.task('partials', function() {
  return gulp.src('src/app/**/*.html')
    .pipe($.htmlmin({ removeComments: true, collapseWhitespace: true }))
    .pipe($.ngHtml2Js({ moduleName: 'app' }))
    .pipe($.uglify({ preserveComments: 'some' }))
    .pipe(gulp.dest('dist/partials'))
    .pipe($.size({ title: 'partials', showFiles: true }));
});

// Just copies index.html into dist folder
gulp.task('copyIndex', function() {
  return gulp.src('src/index.html')
    .pipe($.plumber())
    .pipe(gulp.dest('dist/'))
    .pipe($.size({ title: 'copyIndex', showFiles: true }));
});

// Inject all partials (*.js) into dist/index.html
gulp.task('injectPartials', ['copyIndex', 'partials'], function() {
  return gulp.src('dist/index.html')
    .pipe($.plumber())
    .pipe($.inject(gulp.src('dist/partials/**/*.js', { read: false }), {
      starttag: '<!-- inject:partials -->',
      addRootSlash: false,
      relative: true
    }))
    // .pipe(htmlmin({ removeComments: true, collapseWhitespace: true }))
    .pipe(gulp.dest('dist/'))
    .pipe($.size({ title: 'injectPartials', showFiles: true }));
});

// Injects bower components
gulp.task('wiredep', function() {
  var wiredep = $.wiredep.stream;
  return gulp.src('src/index.html')
    .pipe(wiredep({
      directory: 'bower_components',
      exclude: [/bootstrap.css/],
    }))
    .pipe(gulp.dest('src'))
    .pipe($.size({ title: 'wiredep', showFiles: true }));
});

// Change and concat bower assets
gulp.task('useref', function() {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets = $.useref.assets();

  return gulp.src('src/index.html')
    .pipe(assets)
    .pipe(jsFilter)
    .pipe($.uglify({ preserveComments: 'some' }))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe($.rev())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulp.dest('dist'));
});

// Build task (for production only)
gulp.task('build', function() {
  var temp = ENV;
  ENV = distribution;
  $.runSequence('compileCustomeVendors', 'compileApp', PREPROCESSOR, 'copyAssets', 'copyFonts', 'wiredep', 'injectPartials', 'useref', function() {
    ENV = temp;
  });
});

// Build and serves
gulp.task('default', function() {
  $.runSequence(['compileCustomeVendors', 'compileApp', PREPROCESSOR, 'copyAssets', 'copyFonts', 'wiredep'], 'connect', 'watch');
});

gulp.task('watch', function() {
  gulp.watch(['src/vendors/**/*.js'], ['compileCustomeVendors']);
  gulp.watch(['src/app/**/*.js'], ['compileApp']);
  gulp.watch(['src/assets/**/*'], ['copyAssets']);
  gulp.watch(['src/app/**/*.html', 'src/index.html'], $.browserSync.reload);

  if (PREPROCESSOR === lessLang)
    gulp.watch(['src/styles/less/**/*.less'], ['less']);
  else
    gulp.watch(['src/styles/sass/**/*.scss'], ['sass']);

});
