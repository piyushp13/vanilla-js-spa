const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('styles.min.css');
const BeforeBuildPlugin = require('before-build-webpack');
const bundle = require('./bundler-entry.js').bundle;
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
    extractCSS,
    new CleanWebpackPlugin(),
    new CopyPlugin([{
      from: 'src/assets', to: 'assets'
    }, {
      from: 'src/favicon.ico', to: 'favicon.ico'
    }]),
    new BeforeBuildPlugin(function(stats, callback) {
      bundle();
      callback();
    }),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: 'src/index.html'
    })
  ], module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCSS.extract([
          'css-loader',
          'postcss-loader'
        ])
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
}