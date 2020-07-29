const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  stats: 'errors-warnings',
  performance: {
    hints: false
  },
  optimization: {
    moduleIds: 'hashed',
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin()]
  },
  entry: {
    index: './src/index/index.js',
    dashboard: './src/dashboard/dashboard.js',
    slideshow: './src/slideshow/slideshow.js'
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new StylelintPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index/index.html',
      chunks: ['index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/dashboard/dashboard.html',
      chunks: ['dashboard'],
      filename: 'dashboard.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/slideshow/slideshow.html',
      chunks: ['slideshow'],
      filename: 'slideshow.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/404.html',
      chunks: [],
      filename: '404.html'
    }),
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: path.resolve(__dirname, 'src'),
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.(scss)$/,
        include: path.resolve(__dirname, 'src'),
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  }
}
