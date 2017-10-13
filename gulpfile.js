var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");
var nodemon = require('gulp-nodemon');

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

gulp.task('runserver', ['transformJsxToJsAndConcat'], function (cb) {
    var stream = nodemon({
        script: 'index.js',
        ext: 'css jsx js html',
        tasks: ['transformJsxToJsAndConcat'],
        ignore: [
            'node_modules/',
            'scripts/js'  
        ],
    });

    stream
        .on('start', function () {
            console.log('Server started!')
        })
        .on('restart', function () {
            console.log('Server restarted!')
        })
        .on('crash', function () {
            console.error('Server has crashed!\n')
            stream.emit('restart', 10)  // restart the server in 10 seconds 
        })
});