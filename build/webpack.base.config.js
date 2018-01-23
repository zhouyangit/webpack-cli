const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// const CopyWebpackPlugin = require('copy-webpack-plugin'); 

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

// 多入口管理文件
const entryJSON = require("../config/entry.json");

// 因为多入口，所以要多个HtmlWebpackPlugin，每个只能管一个入口
let plugins = entryJSON.map(page => {
  return new HtmlWebpackPlugin({
    filename: resolve(`/dist/${page.url}.html`),
    template: resolve(`src/pages/${page.url}/index.html`),
    chunks: [page.url, "base"],
    minify: {
      caseSensitive: false,
      collapseBooleanAttributes: true, 
      collapseWhitespace: true
    },
  });
});

// 入口管理
let entry = {
  // 引入jQuery，这个是为了配合 webpack.optimize.CommonsChunkPlugin 这个插件使用。
};

entryJSON.map(page => {
  entry[page.url] = path.resolve(__dirname,`../src/pages/${page.url}/index.js`);
});

module.exports = {
  entry: entry,
  output: {
    path: resolve('dist'),
    filename: "js/[name]_[chunkhash:8].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader"],
          publicPath: "../"
        })
      },
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader'
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader", "less-loader"],
          publicPath: "../"
        })
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: { limit: 20480, outputPath: "images/" }
          }
        ],
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
        include:resolve('src')
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          { loader: "file-loader?limit=1024&name=fonts/[name].[ext]" }
        ]
      },
      {
        test: /\.ejs$/,
        use: ["ejs-html-loader"]
      }
    ]
  },

  resolve: {
    extensions: [".js", ".less", ".json"],

    alias: {
      common: "../../common",
      assets:resolve('src/assets')
    }
  },

  plugins: [
    // new CopyWebpackPlugin([
    //   {
    //     from: "./src/images",
    //     to: path.resolve(__dirname, "../dist/images")
    //   }
    // ]),

    new ExtractTextPlugin({
      //从bundle中提取出
      filename: getPath => {
        return getPath("css/[name]_[chunkhash:8].css").replace("css/js", "css");
      },
      disable: false //禁用插件为false
      // allChunks:true
    }),
    // new PurifyCSSPlugin({
    //   paths: glob.sync(resolve('src/*/*/*.ejs')),
    // })
  ].concat(plugins)
};
