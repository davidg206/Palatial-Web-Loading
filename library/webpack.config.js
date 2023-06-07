const package = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.ts',
  },
  devtool: 'inline-source-map',
  module: {
      rules: [
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: [
              /node_modules/,
            ],
          },
          {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
          },
      ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      LIBRARY_VERSION: JSON.stringify(package.version)
    }),
    new MiniCssExtractPlugin()
  ],
  output: {
    filename: 'libspsfrontend.min.js',
    library: 'libspsfrontend', // exposed variable that will provide access to the library classes
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    clean: false,
    globalObject: 'this'
  },
  optimization: {
    minimize: false
  },
};
