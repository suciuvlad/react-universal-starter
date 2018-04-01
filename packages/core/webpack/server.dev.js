const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const StartServerPlugin = require('start-server-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const paths = require('./paths');
const nodeModules = paths.userNodeModulesPath;
// const entry = path.resolve(__dirname, '../src/render.tsx');
const entry = paths.serverSrcPath;
const output = `${ paths.rootPath }/.build/server`;

const threadLoader = {
  loader: 'thread-loader',
  options: {
    // there should be 1 cpu for the fork-ts-checker-webpack-plugin
    workers: require('os').cpus().length - 1
  }
}

const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
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
        "extensions": [".js", ".jsx", ".ts", ".tsx"],
        "root": ["./src"]
      }]
    ],

    "env": {
      "development": {
        "plugins": [
          ["module-resolver", {
            "extensions": [".js", ".jsx", ".ts", ".tsx"],
            "root": ["./src"]
          }],
          "react-hot-loader/babel"
        ]
      }
    }
  }
}

// if you're specifying externals to leave unbundled, you need to tell Webpack
// to still bundle `react-universal-component`, `webpack-flush-chunks` and
// `require-universal-module` so that they know they are running
// within Webpack and can properly make connections to client modules:
const externals = fs
  .readdirSync(nodeModules)
  .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
  .reduce((acc, mod) => {
    acc[mod] = `commonjs ${ mod }`;
    return acc;
  }, {});

externals['react-dom/server'] = 'commonjs react-dom/server';

module.exports = {
  context: process.cwd(),
  // context: __dirname,
  name: 'server',
  mode: "development",
  target: 'node',
  devtool: 'eval',
  entry: [
    entry
  ],

  externals,

  output: {
    path: output,
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        include: [ paths.rootPath, path.resolve(__dirname, '../src') ],
        use: [
        { loader: 'cache-loader' },
        threadLoader,
        babelLoader
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  plugins: [
    new StartServerPlugin(),
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true
    }),
    new WriteFilePlugin(),
    new CleanWebpackPlugin(output, { root: process.cwd() }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
};