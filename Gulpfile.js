
var path = require('path');
var del = require('del');
var gulp = require('gulp');
var gulpWatch = require('gulp-watch');
var gulpJsxcs = require('gulp-jsxcs');
var gulpCsslint = require('gulp-csslint');
var gulpLess = require('gulp-less');
var gulpSass = require('gulp-sass');
var gulpRename = require('gulp-rename');
var gulpSourcemaps = require('gulp-sourcemaps');

var jscsConfig = require('./config/jscs.config');

gulp.task('lint-js', function() {
    return gulp.src([
        path.join(process.env.CODY_SRC, '**/*.js'),
        '!' + path.join(process.env.CODY_SRC, '**/*.min.js')
    ])
        .pipe(gulpJsxcs(jscsConfig));
});

gulp.task('lint-css', function() {
    return gulp.src(path.join(process.env.CODY_SRC, '**/*.css'))
        .pipe(gulpCsslint())
        .pipe(gulpCsslint.reporter());
});

gulp.task('clear-html', function(done) {
    del([path.join(process.env.CODY_BUILD, '**/*.html')], {
        force: true
    }, done)
});

gulp.task('clear-css', function(done) {
    del([path.join(process.env.CODY_BUILD, '**/*.css')], {
        force: true
    }, done)
});

gulp.task('clear-less', function(done) {
    del([path.join(process.env.CODY_BUILD, '**/*.less.css')], {
        force: true
    }, done)
});

gulp.task('clear-scss', function(done) {
    del([path.join(process.env.CODY_BUILD, '**/*.scss.css')], {
        force: true
    }, done)
});

gulp.task('clear-js', function(done) {
    del([path.join(process.env.CODY_BUILD, '**/*.js')], {
        force: true
    }, done)
});

gulp.task('copy-html', ['clear-html'], function() {
    return gulp.src(path.join(process.env.CODY_SRC, '**/*.html'))
        .pipe(gulp.dest(process.env.CODY_BUILD));
});

gulp.task('copy-css', ['clear-css'], function() {
    return gulp.src(path.join(process.env.CODY_SRC, '**/*.css'))
        .pipe(gulp.dest(process.env.CODY_BUILD));
});

gulp.task('copy-js', ['clear-js'], function() {
    return gulp.src(path.join(process.env.CODY_SRC, '**/*.js'))
        .pipe(gulp.dest(process.env.CODY_BUILD));
});

gulp.task('transpile-less', ['clear-less'], function() {
    return gulp.src(path.join(process.env.CODY_SRC, '*.less'))
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
    return gulp.src(path.join(process.env.CODY_SRC, '*.scss'))
        .pipe(gulpSourcemaps.init())
        .pipe(gulpSass())
        .pipe(gulpSourcemaps.write())
        .pipe(gulpRename(function(path) {
            path.extname = '.scss.css'
        }))
        .pipe(gulp.dest(process.env.CODY_BUILD));
});

gulp.task('watch', function() {
    gulpWatch(path.join(process.env.CODY_SRC, '**/*.html'), function() {
        gulp.start('copy-html');
    });
    gulpWatch(path.join(process.env.CODY_SRC, '**/*.css'), function() {
        console.log('relint');
        gulp.start('copy-css');
        gulp.start('lint-css');
    });
    gulpWatch(path.join(process.env.CODY_SRC, '**/*.js'), function() {
        gulp.start('copy-js');
        gulp.start('lint-js');
    });
    gulpWatch(path.join(process.env.CODY_SRC, '**/*.less'), function() {
        gulp.start('transpile-less');
    });
    gulpWatch(path.join(process.env.CODY_SRC, '**/*.scss'), function() {
        gulp.start('transpile-scss');
    });
});
