const os = require("os");
const path = require("path");
const webpack = require("webpack");

const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// const ESLintWebpackPlugin = require("eslint-webpack-plugin");

const threads = os.cpus().length;
// file-loader
// url-loader
// source-map-loader
// image-loader
// babel-loader

// define-plugin
// html-webpack-plugin
// uglifyjs-webpack-plugin
// mini-css-extract-plugin
const CSS_LOADER_USE_CONFIG = [
  "style-loader", //使用style-loader
  {
    loader: "css-loader", // https://github.com/webpack-contrib/css-loader
    options: {
      modules: {
        // css module
        mode: "local",
        auto: true,
        namedExport: false, // 必须设置，其默认值取决于esModule ，而esModule 的默认值是true
      },
    },
  },
  "postcss-loader",
];

// AutoWebPlugin
/** @type {import('webpack').Configuration} */
module.exports = {
  mode: "development",
  devtool: 'source-map',
  entry: {
    popup: "./src/popup/index.js",
    options: "./src/options/index.js",
    newtab: "./src/newtab/index.js",
  }, //入口文件
  output: {
    path: path.resolve(__dirname, "dist/scripts"),
    clean: true,
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // 支持省略 .js 和 .jsx 扩展名
  },
  devServer: {
    port: 8080,
    open: true,
    hot: true,
    // 将 bundle 写到磁盘而不是内存
    devMiddleware: {
      writeToDisk: true,
    },
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/, //正则匹配js.ts.jsx.tsx结尾的文件
        include: path.resolve(__dirname, "src"), // include exclude 二选一
        // exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: false,
                    useBuiltIns: "usage",
                    corejs: {
                      version: 3,
                      proposals: true,
                    },
                  },
                ],
                "@babel/preset-react",
              ],
              plugins: [],
            },
          },
          "astroturf/loader",
        ],
      },
      {
        test: /\.css$/i, //正则匹配.css结尾的文件
        use: CSS_LOADER_USE_CONFIG,
      },
      {
        test: /\.s[ac]ss$/,
        use: [...CSS_LOADER_USE_CONFIG, "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: "asset", // file-loader + url-loader
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: "images/[name][hash:10][ext][query]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource", // file-loader
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
      // {
      //   test: /\.html$/, //正则匹配.html结尾的文件
      //   use: [
      //     {
      //       loader: "html-loader", //使用html-loader
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/content_scripts"),
          to: path.resolve(__dirname, "dist/content_scripts"),
        },
        {
          from: path.resolve(__dirname, "src/manifest.json"),
          to: path.resolve(__dirname, "dist/manifest.json"),
        },
        {
          from: path.resolve(__dirname, "src/icon.png"),
          to: path.resolve(__dirname, "dist/icon.png"),
        },
      ],
    }),
    // new ESLintWebpackPlugin({
    //     extensions: ["js", "jsx", "ts", "tsx"],
    //     context: path.resolve(__dirname, "src"),
    //     exclude: "node_modules",// 默认值
    //     cache: true,
    //     cacheLocation: path.resolve(__dirname, "node_modules/.cache/.eslintcache"),
    //     threads: threads
    // }),
    new HtmlWebPackPlugin({
      title: "react-ts-project", // react的一个转换插件
      filename: path.resolve(__dirname, "dist/popup.html"),
      template: "src/popup/index.html", // 当前模板地址
      chunks: ["popup"],
    }),
    new HtmlWebPackPlugin({
      title: "react-ts-project", // react的一个转换插件
      filename: path.resolve(__dirname, "dist/newtab.html"),
      template: "src/newtab/index.html", // 当前模板地址
      chunks: ["newtab"],
    }),
    new HtmlWebPackPlugin({
      title: "react-ts-project", // react的一个转换插件
      filename: path.resolve(__dirname, "dist/options.html"),
      template: "src/options/index.html", // 当前模板地址
      chunks: ["options"],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "async", // all
      minSize: 20000, // bytes
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    // runtimeChunk: {
    //   name: (entrypoint) => `runtime-${entrypoint.name}`,
    // },
  },
};
