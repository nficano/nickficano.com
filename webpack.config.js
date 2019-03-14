const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const parts = require('./webpack/webpack.parts');

module.exports = merge([
  {
    mode: 'production',
    devtool: false,
    entry: [
      `${__dirname}/client/index`,
    ],
    output: {
      path: __dirname,
      filename: `client/static/js/bundle.[hash].js`,
      publicPath: '/static/'
    },
  },
  parts.createManifest('manifest.json'),
  parts.bundleCSS(),
  parts.bundleSCSS(),
  parts.minifyJS(),
]);
