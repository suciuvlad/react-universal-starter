const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin')

const packageFile = require('../package.json');

const paths = require('./paths');

const output = `${ paths.rootPath }/.build/client`;

const entry = path.resolve(__dirname, '../src/client.tsx');

module.exports = {
  context: process.cwd(),
  name: 'client',
  mode: "development",
  target: 'web',
  devtool: 'eval',
  entry: {
    main: [
      'react-hot-loader/patch',
      entry,
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false'
    ]
    // vendor: Object.keys(packageFile.dependencies)
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: output,
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        include: [ paths.rootPath, path.resolve(__dirname, '../src') ],
        loader: 'babel-loader',
        options: {
          "presets": [
            ["@babel/env", {
              "debug": false
            }],
            "@babel/stage-3",
            "@babel/react",
            "@babel/typescript"
          ],

          "plugins": [
            ["@babel/plugin-transform-runtime"],
            ["universal-import"],
            ["module-resolver", {
              "extensions": [".js", ".jsx", ".ts", ".tsx", ".json"],
              "root": ["./src"]
            }]
          ],

          "env": {
            "development": {
              "plugins": [
                ["module-resolver", {
                  "extensions": [".js", ".jsx", ".ts", ".tsx", ".json"],
                  "root": ["./src"]
                }],
                "react-hot-loader/babel"
              ]
            }
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  plugins: [
    new StatsPlugin('stats.json'),
    new WriteFilePlugin(),
    new CleanWebpackPlugin([output], { root: process.cwd() }),

    new AssetsPlugin({
      filename: 'assets-manifest.json',
      path: output,
      prettyPrint: true
    }),

    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['vendor'],
    //   minChunks: Infinity
    // }),

    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'main',
    //   children: true,
    //   minChunks: 2
    // }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
};