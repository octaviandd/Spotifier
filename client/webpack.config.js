/** @format */

const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");
const UglifyPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = function (env, args) {
  const isProduction = args.mode === "production";
  const isDevelopment = !isProduction;

  return {
    entry: "./src/index.tsx",
    output: {
      filename: "assets/js/[name].[contenthash:8].js",
      publicPath: "/",
      path: path.resolve(__dirname, "build"),
      clean: true,
    },
    performance: {
      hints: "warning",
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith(".js.gz");
      },
    },
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.tsx?/,
          use: "ts-loader",
          exclude: "/node_modules/",
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "postcss-loader",
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]",
                publicPath: "/",
              },
            },
          ],
        },
        {
          test: /\.mp3$/,
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          },
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
      isProduction &&
        new MiniCssExtractPlugin({
          filename: "assets/css/[name].[contenthash:8].css",
          chunkFilename: "assets/css/[name].[contenthash:8].chunk.css",
        }),
      new CompressionPlugin({
        test: /\.js(\?.*)?$/i,
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(
          isProduction ? "production" : "development"
        ),
      }),
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, "./public/index.html"),
        inject: true,
        favicon: "./images/logo.png",
      }),
    ].filter(Boolean),
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /node_modules\/(?!antd\/).*/,
            name: "vendors",
            chunks: "all",
          },
          // This can be your own design library.
          antd: {
            test: /node_modules\/(antd\/).*/,
            name: "antd",
            chunks: "all",
          },
        },
      },
      runtimeChunk: {
        name: "manifest",
      },
      minimize: isProduction,
      minimizer: [
        new OptimizeCssAssetsPlugin(),
        new UglifyPlugin({
          uglifyOptions: {
            output: { comments: false, beautify: false },
            ie8: false,
            ecma: 8,
          },
        }),
      ],
    },
    devServer: {
      compress: true,
      historyApiFallback: true,
      open: true,
    },
  };
};
