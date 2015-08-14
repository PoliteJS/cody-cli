
var gulp = require('gulp');
var path = require('path');
//var gulpJsxcs = require('gulp-jsxcs');

gulp.task('foo', function() {
    console.log('gulp task');
    console.log(process.cwd());
    console.log(process.env.WDEV_HASH);
    console.log(process.env.WDEV_SRC);
});

gulp.task('copy-html', function() {
    return gulp.src(path.join(process.env.WDEV_SRC, '**/*.html'))
        .pipe(gulp.dest(process.env.WDEV_BUILD));
});
