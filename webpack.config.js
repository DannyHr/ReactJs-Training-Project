var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'scripts/js/');
var APP_DIR = path.resolve(__dirname, 'scripts/src/');

var config = {
    entry: APP_DIR + '/app.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel-loader'
            }
        ]
    }
};

module.exports = config;