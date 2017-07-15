const gulp = require("gulp");
const liveReload = require("gulp-livereload");
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const SCRIPTS_PATH = 'public/js/myApp.js';
const CSS_PATH = 'public/sass/main.scss';
const HTML_PATH = 'public/index.html';

gulp.task('scripts', function () {
    console.log("scripts started...");
    return gulp.src(SCRIPTS_PATH)
        .pipe(liveReload());
});

gulp.task('html', function () {
    console.log("html task........");
    return gulp.src(HTML_PATH)
        .pipe(liveReload());
});

gulp.task('styles', function () {

    console.log("style task..........");
    return gulp.src(CSS_PATH)
        .pipe(sourcemaps.init())
//        .pipe(autoprefixer({
//            browsers: ['last 2 versions'],
//            cascade: false
//        }))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'))
        .pipe(liveReload());
});

gulp.task('default', ['scripts', 'html', 'styles'], function () {
    console.log('default task.......');
});

gulp.task('watch', ['default'], function () {
    console.log("gulp watch started...");
    require('./server.js');
    liveReload.listen();

    gulp.watch(SCRIPTS_PATH, ['scripts']);

    gulp.watch(CSS_PATH, ['styles']);

    gulp.watch(HTML_PATH, ['html']);

});
