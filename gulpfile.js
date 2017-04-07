/*gulpfile.js*/

var gulp = require("gulp");
var clean = require('gulp-clean');
//var plumber = require("gulp-plumber");
//var sourcemaps = require("gulp-sourcemaps");
//var uglify = require('gulp-uglify');
//var rename = require("gulp-rename");
var less = require('gulp-less');
var browser = require('browser-sync');

var path = {
    app: {
        mock: 'app/mock',
        dist: 'app/dist'
    },
    src: {
        view: 'src/view',
        less: 'src/less'
    }
};

gulp.task('cleanApp', function () {
    gulp.src('app/*')
        .pipe(clean());
});

gulp.task('view', function () {
    gulp.src(path.src.view + '/index.html')
        .pipe(gulp.dest(path.app.mock));
});

gulp.task('less', function () {
    gulp.src(path.src.less + '/common.less')
        .pipe(less())
        .pipe(gulp.dest(path.app.mock + '/css'));
});

gulp.task('bs-reload:view', ['view'], function () {
    browser.reload();
});
gulp.task('bs-reload:less', ['less'], function () {
    browser.reload();
});

gulp.task('serve', function () {
    gulp.watch([path.src.view + '/*.html'], ['bs-reload:view']);
    gulp.watch([path.src.less + '/*.less'], ['bs-reload:less']);
    browser({
        server: {
            baseDir: path.app.mock,
            index: 'index.html'
        }
    });
});

gulp.task('default', function () {
    console.log('gulp');
});
