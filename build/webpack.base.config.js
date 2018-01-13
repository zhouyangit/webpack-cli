const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const glob = require("glob");
const PurifyCSSPlugin = require("purifycss-webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin'); 

// 因为自己改变了文件的路径，这里需要重新处理一下
function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

// 多入口管理文件
const entryJSON = require("../config/entry.json");

// 因为多入口，所以要多个HtmlWebpackPlugin，每个只能管一个入口
let plugins = entryJSON.map(page => {
  return new HtmlWebpackPlugin({
    filename: resolve(`/dist/${page.url}.html`),
    template: `ejs-render-loader!./src/pages/${page.url}/index.ejs`,
    chunks: [page.url, "foo"],  // 实现多入口的核心，决定自己加载哪个js文件，这里的 page.url 指的是 entry 对象的 key 所对应的入口打包出来的js文件
    // minify: false,   // 压缩，如果启用这个的话，需要使用html-minifier，不然会直接报错
    minify: {
      caseSensitive: false, //是否大小写敏感
      collapseBooleanAttributes: true, //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled 
      collapseWhitespace: true //是否去除空格
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
    path: path.join(__dirname, "../dist/"),
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
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader", "less-loader"],
          publicPath: "../"
        })
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        // use: [
        //   {
        //     loader: "url-loader",
        //     options: { limit: 307200, outputPath: "images/" }
        //   }
        // ],
        use: [
          { loader: "file-loader?limit=1024&name=images/[name].[ext]" } //加载器file-loader和npm run build之后 图片的存储文件夹
        ]
      },
      // {
      //   test: /\.html$/,
      //   use: [{ loader: "html-withimg-loader" }]
      // },
      {
        //处理html，插入在html中的图片img用此处理
        test: /\.html$/,
        use: [{ loader: "html-loader" }]
      },
      {
        //处理handlebar
        test: /\.handlebars$/,
        use: [{ loader: "handlebars-loader" }]
      },
      {
        test: /\.js$/,
        loader: { loader: "babel-loader" },
        exclude: resolve("node_modules"),
        // include: resolve("src")`
        // include: path.join(__dirname, "src") //包含的路径（匹配特定条件）
      },
      {
        //处理字体
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          // 'file-loader'//等同于{loader:'file-loader'}
          { loader: "file-loader?limit=1024&name=fonts/[name].[ext]" } //加载器file-loader和npm run build之后字体的存储文件夹
        ]
      },
      {
        test: /\.art$/,
        loader: "art-template-loader",
        options: {}
      },
      {
        test: /\.ejs$/,
        use: ["ejs-html-loader"]
      }
    ]
  },

  resolve: {
    extensions: [".js", ".less", ".css"],

    alias: {
      common: "../../common"
    }
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: "./src/common/images",
        to: path.resolve(__dirname, "../dist/images")
      }
    ]),

    new ExtractTextPlugin({
      //从bundle中提取出
      filename: getPath => {
        return getPath("css/[name]_[chunkhash:8].css").replace("css/js", "css");
      },
      disable: false //禁用插件为false
      // allChunks:true
    })
  ].concat(plugins)
};
