const webpack = require('webpack');
const path = require('path');


const ENV = process.env.NODE_ENV || 'development';
const DEBUG = ENV !== 'production';

const SRC_PATH = path.resolve(__dirname, 'src');
const BUILT_PATH = path.resolve(__dirname, 'built');

module.exports = {
    devtool: DEBUG ? 'inline-sourcemap' : false,
    entry: {
        app: [
            'babel-polyfill',
            SRC_PATH + '/js/App.jsx'
        ],
        serviceWorker: SRC_PATH + '/js/serviceWorker.js'
    },
    output: {
        path: BUILT_PATH,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: Object.assign({
            containers: SRC_PATH + '/js/containers',
            components: SRC_PATH + '/js/components',
            layouts: SRC_PATH + '/js/layouts',
            store: SRC_PATH + '/js/store',
            utils: SRC_PATH + '/js/utils',
            queries: SRC_PATH + '/js/queries'
        }, DEBUG ? {} : {
            react: 'preact-compat/dist/preact-compat.js',
            'react-dom': 'preact-compat/dist/preact-compat.js'
        })
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-1'],
                    plugins: [
                        'transform-decorators-legacy'
                    ]
                }
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: [/node_modules/],
                loader: 'graphql-tag/loader'
            }
        ]
    },
    plugins: (DEBUG ? [] : [
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            compress: {
                warnings: false,
                drop_console: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ])
};

