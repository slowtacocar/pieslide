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
    login: './src/login/login.js',
    dashboard: './src/dashboard/dashboard.js',
    slideshow: './src/slideshow/slideshow.js',
    '404': './src/404/404.js'
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
      title: 'PieSlide - Login',
      filename: 'login.html',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      chunks: ['login']
    }),
    new HtmlWebpackPlugin({
      title: 'PieSlide - Dashboard',
      filename: 'index.html',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      chunks: ['dashboard']
    }),
    new HtmlWebpackPlugin({
      title: 'PieSlide - Slideshow',
      filename: 'slideshow.html',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      },
      chunks: ['slideshow']
    }),
    new HtmlWebpackPlugin({
      title: 'Page Not Found',
      filename: '404.html',
      meta: {
        viewport: 'width=device-width, initial-scale=1'
      },
      chunks: ['404']
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
