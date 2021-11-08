/** @format */

const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");

module.exports = function (env, args) {
  const isProduction = args.mode === "production";
  const isDevelopment = !isProduction;

  return {
    entry: "./src/index.tsx",
    output: {
      filename: "assets/js/[name].[contenthash:8].js",
      publicPath: "/",
      path: path.resolve(__dirname, "dist"),
      clean: true,
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
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(
          isProduction ? "production" : "development"
        ),
      }),
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, "./public/index.html"),
        inject: true,
      }),
    ].filter(Boolean),
    optimization: {
      minimize: isProduction,
      minimizer: [new OptimizeCssAssetsPlugin()],
    },
    devServer: {
      compress: true,
      historyApiFallback: true,
      open: true,
    },
  };
};
