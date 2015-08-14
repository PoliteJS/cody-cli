
var path = require('path');
var del = require('del');
var gulp = require('gulp');
var gulpWatch = require('gulp-watch');

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
        gulp.start('copy-css');
    });
    gulpWatch(path.join(process.env.WDEV_SRC, '**/*.js'), function() {
        gulp.start('copy-js');
    });
});
