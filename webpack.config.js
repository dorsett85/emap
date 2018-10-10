const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: path.join(__dirname, 'frontend/src/index'),
  output: {
    path: path.join(__dirname, 'frontend/dist'),
    filename: process.env.NODE_ENV !== 'production' ? 'main.js' : '[name]-[hash].js',
    publicPath: "/static/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'frontend/src'),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'frontend/src'),
        use: [{
          loader: process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader
        }, {
          loader: "css-loader",
          options: {
            modules: true,
            localIdentName: '[name]_[hash]',
          }
        }, {
          loader: "sass-loader"
        }]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]-[hash].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'frontend/src/index.html')
    }),
    new CleanWebpackPlugin(['frontend/dist'])
  ]
};