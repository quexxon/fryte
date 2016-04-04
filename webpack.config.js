const path = require('path'),
      webpack = require('webpack');

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/assets/',
    filename: "fryte.min.js",
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style!css",
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline',
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015'],
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      mangle: {
        except: ['$'],
      },
    }),
  ],
  devServer: {
    contentBase: './example',
    inline: true,
  },
};
