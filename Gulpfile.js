
var path = require('path');
var del = require('del');
var gulp = require('gulp');
var gulpWatch = require('gulp-watch');
var gulpJsxcs = require('gulp-jsxcs');
var gulpCsslint = require('gulp-csslint');

var jscsConfig = require('./config/jscs.config');

gulp.task('lint-js', function() {
    return gulp.src([
        path.join(process.env.WDEV_SRC, '**/*.js'),
        '!' + path.join(process.env.WDEV_SRC, '**/*.min.js')
    ])
        .pipe(gulpJsxcs(jscsConfig));
});

gulp.task('lint-css', function() {
    return gulp.src(path.join(process.env.WDEV_SRC, '**/*.css'))
        .pipe(gulpCsslint())
        .pipe(gulpCsslint.reporter());
});

gulp.task('clear-html', function(done) {
    del([path.join(process.env.WDEV_BUILD, '**/*.html')], {
        force: true
    }, done)
});

gulp.task('clear-css', function(done) {
    del([path.join(process.env.WDEV_BUILD, '**/*.css')], {
        force: true
    }, done)
});

gulp.task('clear-js', function(done) {
    del([path.join(process.env.WDEV_BUILD, '**/*.js')], {
        force: true
    }, done)
});

gulp.task('copy-html', ['clear-html'], function() {
    return gulp.src(path.join(process.env.WDEV_SRC, '**/*.html'))
        .pipe(gulp.dest(process.env.WDEV_BUILD));
});

gulp.task('copy-css', ['clear-css'], function() {
    return gulp.src(path.join(process.env.WDEV_SRC, '**/*.css'))
        .pipe(gulp.dest(process.env.WDEV_BUILD));
});

gulp.task('copy-js', ['clear-js'], function() {
    return gulp.src(path.join(process.env.WDEV_SRC, '**/*.js'))
        .pipe(gulp.dest(process.env.WDEV_BUILD));
});

gulp.task('watch', function() {
    gulpWatch(path.join(process.env.WDEV_SRC, '**/*.html'), function() {
        gulp.start('copy-html');
    });
    gulpWatch(path.join(process.env.WDEV_SRC, '**/*.css'), function() {
        console.log('relint');
        gulp.start('copy-css');
        gulp.start('lint-css');
    });
    gulpWatch(path.join(process.env.WDEV_SRC, '**/*.js'), function() {
        gulp.start('copy-js');
        gulp.start('lint-js');
    });
});
