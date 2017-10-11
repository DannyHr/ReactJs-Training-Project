var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");
var webserver = require('gulp-webserver');

var jsFiles = [
    'scripts/src/**/!(app)*.js',
    'scripts/src/**/!(app)*.jsx',
    'scripts/src/app.jsx'
]

gulp.task('transformJsxToJsAndConcat', function () {
    return gulp.src(jsFiles)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ["react"]
        }))
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("scripts/js/"));
});

gulp.task('webserver', ['transformJsxToJsAndConcat'], function () {
    gulp.src('./')
        .pipe(webserver({
            livereload: true
        }));
});