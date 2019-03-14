const ManifestPlugin = require('webpack-manifest-plugin');
exports.createManifest = (filename) => ({
  plugins: [
    new ManifestPlugin({
      filename: filename,
      publicPath: '/',
    }),
  ],
});

const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
exports.minifyJS = () => ({
  optimization: {
    minimizer: [
      new UglifyWebpackPlugin({
        sourceMap: true,
        extractComments: true,
      }),
    ]
  }
});

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
exports.bundleCSS = ({ include, exclude } = {}) => ({
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'client/static/css/[name].[hash].css',
      chunkFilename: 'client/static/css/[id].[hash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true,
            },
          },
        ],
      },
    ]
  }
});

exports.bundleSCSS = ({ include, exclude } = {}) => ({
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'client/static/css/[name].[hash].css',
      chunkFilename: 'client/static/css/[id].[hash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        include,
        exclude,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true,
              minimize: true
            },
          },
          {
            loader: 'sass-loader',
            options: {
              url: false,
              sourceMap: true,
              minimize: true
            },
          },
        ],
      },
    ]
  }
});
