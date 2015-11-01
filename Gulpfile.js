
var path = require('path');
var del = require('del');
var gulp = require('gulp');
var gulpWatch = require('gulp-watch');
var gulpJsxcs = require('gulp-jsxcs');
var gulpCsslint = require('gulp-csslint');
var gulpLess = require('gulp-less');
var gulpSass = require('gulp-sass');
var gulpBabel = require('gulp-babel');
var gulpRename = require('gulp-rename');
var gulpSourcemaps = require('gulp-sourcemaps');

var jscsConfig = require('./config/jscs.config');





var ASSETS_GLOBS = [
    '**/assets/**/*.*',
    '**/images/**/*.*',
    '**/fonts/**/*.*',
    '**/bower_components/**/*.*',
    '**/node_modules/**/*.*'
];

var IGNORE_SOURCES = ASSETS_GLOBS.map(function(glob) {
    return '!' + path.join(process.env.CODY_SRC, glob);
});

var ASSETS_SOURCES = ASSETS_GLOBS.map(function(glob) {
    return path.join(process.env.CODY_SRC, glob)
});

var HTML_SOURCES = [
    path.join(process.env.CODY_SRC, '**/*.html')
].concat(IGNORE_SOURCES);

var CSS_SOURCES = [
    path.join(process.env.CODY_SRC, '**/*.css')
].concat(IGNORE_SOURCES);

var JS_SOURCES = [
    path.join(process.env.CODY_SRC, '**/*.js')
].concat(IGNORE_SOURCES);

var LESS_SOURCES = [
    path.join(process.env.CODY_SRC, '*.less')
].concat(IGNORE_SOURCES);

var SCSS_SOURCES = [
    path.join(process.env.CODY_SRC, '*.scss')
].concat(IGNORE_SOURCES);

var JSX_SOURCES = [
    path.join(process.env.CODY_SRC, '**/*.jsx')
].concat(IGNORE_SOURCES);

var LINT_JS_SOURCES = [
    path.join(process.env.CODY_SRC, '**/*.js'),
    '!' + path.join(process.env.CODY_SRC, '**/*.min.js')
].concat(IGNORE_SOURCES);

var LINT_CSS_SOURCES = [
    path.join(process.env.CODY_SRC, '**/*.css'),
    path.join(process.env.CODY_SRC, '**/*.min.css')
].concat(IGNORE_SOURCES);





var IGNORE_TARGETS = ASSETS_GLOBS.map(function(glob) {
    return '!' + path.join(process.env.CODY_BUILD, glob);
});

var ASSETS_TARGETS = ASSETS_GLOBS.map(function(glob) {
    return path.join(process.env.CODY_BUILD, glob)
});

var HTML_TARGETS = [
    path.join(process.env.CODY_BUILD, '**/*.html')
].concat(IGNORE_TARGETS);

var CSS_TARGETS = [
    path.join(process.env.CODY_BUILD, '**/*.css'),
    '!' + path.join(process.env.CODY_BUILD, '**/*.less.css'),
    '!' + path.join(process.env.CODY_BUILD, '**/*.scss.css')
].concat(IGNORE_TARGETS);

var JS_TARGETS = [
    path.join(process.env.CODY_BUILD, '**/*.js')
].concat(IGNORE_TARGETS);

var LESS_TARGETS = [
    path.join(process.env.CODY_BUILD, '**/*.less.css')
].concat(IGNORE_TARGETS);

var SCSS_TARGETS = [
    path.join(process.env.CODY_BUILD, '**/*.scss.css')
].concat(IGNORE_TARGETS);





// ---[[   L I N T   ]]--- //

gulp.task('lint-js', function() {
    return gulp.src(LINT_JS_SOURCES)
        .pipe(gulpJsxcs(jscsConfig));
});

gulp.task('lint-css', function() {
    return gulp.src(LINT_CSS_SOURCES)
        .pipe(gulpCsslint())
        .pipe(gulpCsslint.reporter());
});






// ---[[   C L E A R   ]]--- //

gulp.task('clear-assets', function(done) {
    del(ASSETS_TARGETS, {
        force: true
    }, done)
});

gulp.task('clear-html', function(done) {
    del(HTML_TARGETS, {
        force: true
    }, done)
});

gulp.task('clear-css', function(done) {
    del(CSS_TARGETS, {
        force: true
    }, done)
});

gulp.task('clear-less', function(done) {
    del(LESS_TARGETS, {
        force: true
    }, done)
});

gulp.task('clear-scss', function(done) {
    del(SCSS_TARGETS, {
        force: true
    }, done)
});

gulp.task('clear-js', function(done) {
    del(JS_TARGETS, {
        force: true
    }, done)
});

gulp.task('clear-jsx', function(done) {
    del([
        path.join(process.env.CODY_BUILD, '**/*.jsx'),
        '!' + path.join(process.env.CODY_BUILD, 'bower_components/**/*')
    ], {
        force: true
    }, done)
});







// ---[[   C O P Y   ]]--- //

gulp.task('copy-assets', ['clear-assets'], function() {
    return gulp.src(ASSETS_SOURCES)
        .pipe(gulp.dest(process.env.CODY_BUILD));
});

gulp.task('copy-html', ['clear-html'], function() {
    return gulp.src(HTML_SOURCES)
        .pipe(gulp.dest(process.env.CODY_BUILD));
});

gulp.task('copy-css', ['clear-css'], function() {
    return gulp.src(CSS_SOURCES)
        .pipe(gulp.dest(process.env.CODY_BUILD));
});

gulp.task('copy-js', ['clear-js'], function() {
    return gulp.src(JS_SOURCES)
        .pipe(gulp.dest(process.env.CODY_BUILD));
});





// ---[[   T R A N S P I L E   ]]--- //

gulp.task('transpile-less', ['clear-less'], function() {
    return gulp.src(LESS_SOURCES)
        .pipe(gulpSourcemaps.init())
        .pipe(gulpLess({
            paths: [
                path.join(process.env.CODY_SRC, 'bower_components'),
                path.join(process.env.CODY_SRC, 'node_modules')
            ]
        }))
        .pipe(gulpSourcemaps.write())
        .pipe(gulpRename(function(path) {
            path.extname = '.less.css'
        }))
        .pipe(gulp.dest(process.env.CODY_BUILD));
});

gulp.task('transpile-scss', ['clear-scss'], function() {
    return gulp.src(SCSS_SOURCES)
        .pipe(gulpSourcemaps.init())
        .pipe(gulpSass({
            includePaths: [
                path.join(process.env.CODY_SRC, 'bower_components'),
                path.join(process.env.CODY_SRC, 'node_modules')
            ]
        }))
        .pipe(gulpSourcemaps.write())
        .pipe(gulpRename(function(path) {
            path.extname = '.scss.css'
        }))
        .pipe(gulp.dest(process.env.CODY_BUILD));
});

gulp.task('transpile-js', ['clear-jsx'], function() {
    return gulp.src(JSX_SOURCES)
        .pipe(gulpSourcemaps.init())
        .pipe(gulpBabel({
            sourceRoot: process.env.CODY_SRC,
            'presets': ['es2015', 'react']
        }))
        .pipe(gulpSourcemaps.write())
        .pipe(gulp.dest(process.env.CODY_BUILD));
});








gulp.task('watch', function() {
    gulpWatch(ASSETS_SOURCES, function() {
        gulp.start('copy-assets');
    });
    gulpWatch(HTML_SOURCES, function() {
        gulp.start('copy-html');
    });
    gulpWatch(CSS_SOURCES, function() {
        gulp.start('copy-css');
        gulp.start('lint-css');
    });
    gulpWatch(JS_SOURCES, function() {
        gulp.start('copy-js');
        gulp.start('lint-js');
    });
    gulpWatch(LESS_SOURCES, function() {
        gulp.start('transpile-less');
    });
    gulpWatch(SCSS_SOURCES, function() {
        gulp.start('transpile-scss');
    });
    gulpWatch(JSX_SOURCES, function() {
        gulp.start('transpile-js');
    });
});
