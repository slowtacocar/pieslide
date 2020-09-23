const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  devServer: {
    contentBase: "./public",
  },
  devtool: "source-map",
  mode: "development",
});
