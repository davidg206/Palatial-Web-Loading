const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = (env) => {
    return {
        devServer: {
            allowedHosts: 'all',
    	},
	externals: {
		fs: 'empty',
		child_process: 'empty'
	},
    mode: 'development',
    entry: {
      index: './src/index.js',
    },
    plugins: [

      new webpack.DefinePlugin({
        WEBSOCKET_URL: JSON.stringify((env.WEBSOCKET_URL !== undefined) ? env.WEBSOCKET_URL : '')
      }),

      new HtmlWebpackPlugin({
        title: 'Development',
        template: './public/index.html',
        filename: 'index.html'
      }),

      new MiniCssExtractPlugin()

    ],
    // turn off so we can see the source map for dom delegate so we can debug the library
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?|\.d\.ts$/,
          loader: 'ts-loader',
          exclude: [
            /node_modules/,
          ],
        },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
        {
          test: /\.html$/i,
          use: 'html-loader'
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
            test: /\.svg$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        limit: 10000
                    },
                },
            ],
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'file-loader'
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.d.ts', '.js', '.svg'],
      fallback: { "https": require.resolve("https-browserify"), "http": require.resolve("stream-http") }
    },
    output: {
      filename: '[name].[contenthash].js',
      library: 'frontend', // change this to something more meaningful
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'build'),
      clean: true,
      globalObject: 'this'
    },
    optimization: {
      minimize: false
    },
  };
}
