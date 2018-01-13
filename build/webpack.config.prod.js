const baseWebpackConfig = require("./webpack.base.config.js");

const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const uglify = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname,'..');
let pathsToClean = ['dist']
let cleanOptions = {
  root: ROOT_PATH,  //根目录
  verbose:  true,  //开启在控制台输出信息
  dry: false    //启用删除文件
}

module.exports = merge(baseWebpackConfig, {
  plugins: [
    new OptimizeCssAssetsPlugin({
      //对生产环境的css进行压缩
      cssProcessorOptions: { 
        safe: true
      }
    }),
    new uglify(),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
  ]
});
