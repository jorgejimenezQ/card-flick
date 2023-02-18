const path = require('path')

module.exports = {
    entry: './lib/card-flick.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'card-flick.js',
        library: 'CardFlick',
        libraryExport: 'default',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
}
