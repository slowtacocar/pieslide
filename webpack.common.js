const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  "context": path.resolve(__dirname, 'src'),
  "entry": {
    "error": "./error/index.js",
    "dashboard": "./dashboard/index.js",
    "login": "./login/index.js",
    "slideshow": "./slideshow/index.js"
  },
  "module": {
    "rules": [
      {
        "include": path.resolve(__dirname, "src"),
        "test": /\.m?js$/,
        "use": [ "babel-loader", "eslint-loader" ]
      },
      {
        "include": [
          path.resolve(__dirname, "node_modules/@firebase"),
          path.resolve(__dirname, "node_modules/firebase")
        ],
        "test": /\.m?js$/,
        "use": [
          {
            "loader": "babel-loader",
            "options": {
              "presets":
              [
                [
                  "@babel/preset-env",
                  {
                    "corejs": 3,
                    "useBuiltIns": "usage"
                  }
                ]
              ],
              "sourceType": "unambiguous"
            }
          }
        ]
      },
      {
        "test": /\.css$/,
        "use": [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  "optimization": {
    "minimizer": [ new TerserPlugin(), new OptimizeCSSAssetsPlugin() ],
    "moduleIds": "hashed",
    "splitChunks": {
      "chunks": "all"
    }
  },
  "output": {
    "filename": "[name].[contenthash].js",
    "path": path.resolve(__dirname, "public")
  },
  "performance": {
    "hints": false
  },
  "plugins": [
    new StylelintPlugin({
      "files": "**/*.@(s?(a|c)|c)ss"
    }),
    new CleanWebpackPlugin({
      "cleanStaleWebpackAssets": false
    }),
    new MiniCssExtractPlugin({
      "chunkFilename": "[id].[contenthash].css",
      "filename": "[name].[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      "chunks": [ "login" ],
      "filename": "login.html",
      "template": "common/index.ejs",
      "title": "PieSlide - Login"
    }),
    new HtmlWebpackPlugin({
      "chunks": [ "dashboard" ],
      "filename": "index.html",
      "template": "common/index.ejs",
      "title": "PieSlide - Dashboard"
    }),
    new HtmlWebpackPlugin({
      "chunks": [ "slideshow" ],
      "filename": "slideshow.html",
      "template": "common/index.ejs",
      "title": "PieSlide - Slideshow"
    }),
    new HtmlWebpackPlugin({
      "chunks": [ "error" ],
      "filename": "404.html",
      "template": "common/index.ejs",
      "title": "Page Not Found"
    })
  ],
  "stats": "errors-warnings"
};
