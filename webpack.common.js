const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  "entry": {
    "404": "./src/404/404.js",
    "dashboard": "./src/dashboard/dashboard.js",
    "login": "./src/login/login.js",
    "slideshow": "./src/slideshow/slideshow.js"
  },
  "module": {
    "rules": [
      {
        "include": path.resolve(__dirname, "src"),
        "test": /\.m?js$/,
        "use": [ "babel-loader" ]
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
      "meta": {
        "viewport": "width=device-width, initial-scale=1, shrink-to-fit=no"
      },
      "title": "PieSlide - Login"
    }),
    new HtmlWebpackPlugin({
      "chunks": [ "dashboard" ],
      "filename": "index.html",
      "meta": {
        "viewport": "width=device-width, initial-scale=1, shrink-to-fit=no"
      },
      "title": "PieSlide - Dashboard"
    }),
    new HtmlWebpackPlugin({
      "chunks": [ "slideshow" ],
      "filename": "slideshow.html",
      "meta": {
        "viewport": "width=device-width, initial-scale=1, shrink-to-fit=no"
      },
      "title": "PieSlide - Slideshow"
    }),
    new HtmlWebpackPlugin({
      "chunks": [ "404" ],
      "filename": "404.html",
      "meta": {
        "viewport": "width=device-width, initial-scale=1"
      },
      "title": "Page Not Found"
    })
  ],
  "stats": "errors-warnings"
};
