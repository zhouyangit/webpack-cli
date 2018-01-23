const webpack = require("webpack");
const path = require("path");

const baseWebpackConfig = require("./webpack.base.config.js");
const merge = require("webpack-merge");

module.exports = merge(baseWebpackConfig, {
  devtool: "cheap-module-eval-source-map",

  // 只有在开启监听模式时，watchOptions 才有意义
  // 默认为 false，也就是不开启
  watch: true,
  // 监听模式运行时的参数
  // 在开启监听模式时，才有意义
  watchOptions: {
    // 不监听的文件或文件夹，支持正则匹配
    // 默认为空
    ignored: /node_modules/,
    // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
    // 默认为 300ms
    aggregateTimeout: 300,
    // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
    // 默认每秒问 1000 次
    poll: 1000
  },

  devServer: {
    port: 8088,
    contentBase: path.join(__dirname, "dist"),
    publicPath: "/",
    compress: true,
    host: "0.0.0.0",
    open: true,
    // hot: true
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin()
  ]
});
