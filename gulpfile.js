var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gulpWebpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');
var webpack = require('webpack');
var path = require('path');
var gutil = require('gutil');

var jsFiles = [
    'scripts/src/**/!(app)*.js',
    'scripts/src/**/!(app)*.jsx',
    'scripts/src/app.jsx'
];

var BUILD_DIR = path.resolve(__dirname, 'scripts/js/');
var APP_DIR = path.resolve(__dirname, 'scripts/src/');

gulp.task('makeJsModules', function () {
    return gulp.src(APP_DIR + '/app.jsx')
        .pipe(gulpWebpack({
            output: {
                filename: 'app.js',
                sourceMapFilename: 'app.js.map'
            },
            module: {
                loaders: [
                    {
                        test: /\.jsx?/,
                        include: APP_DIR,
                        loader: 'babel-loader'
                    }
                ]
            },
            devtool: '#source-map'
        }, webpack))
        .on('error', gutil.log)
        .pipe(gulp.dest('./scripts/js/'));
});

gulp.task('runserver', ['makeJsModules'], function (cb) {
    var stream = nodemon({
        script: 'index.js',
        ext: 'css jsx js html',
        tasks: ['makeJsModules'],
        ignore: [
            'node_modules/',
            'scripts/js/'
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