var gulp = require('gulp'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('previewDist', function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "docs"
        }
    });
});

gulp.task('deleteDistFolder', function() {
    return del("docs");
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
    //ignore paths with exclamation mark
    var paths = [
        'app/**/*',
        '!app/index.html',
        '!app/assets/styles/**',
        '!app/assets/scripts/**',
        '!app/temp',
        '!app/temp/**'
    ]
    
    return gulp.src(paths)
        .pipe(gulp.dest("./docs"));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function(){
    gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], function() {
    return gulp.src("app/index.html")
        .pipe(usemin({
            css: [function() {return rev()}, function() {return cssnano()}],
            js: [function() {return rev()}, function() {return uglify()}]
        }))
        .pipe(gulp.dest("./docs"));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'useminTrigger']);