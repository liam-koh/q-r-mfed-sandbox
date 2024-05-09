const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;
const TerserPlugin = require('terser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const localEntryUrl = 'home@http://localhost:3002/remoteEntry.js';
const prodEntryUrl =
  'home@http://module-federation-example.s3-website-ap-southeast-2.amazonaws.com/remoteEntry.js';

module.exports = (env = {}) => ({
  mode: 'development',
  cache: false,
  devtool: false,
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new UglifyJsPlugin()],
  },
  target: 'web',
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.vue', '.jsx', '.js', '.json'],
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },
  experiments: {
    topLevelAwait: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader',
          options: { limit: 8192 },
        },
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new ModuleFederationPlugin({
      name: 'layout',
      remotes: {
        home: prodEntryUrl,
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
        vue: {
          eager: true,
        }
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      chunks: ['main'],
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 3001,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
});
