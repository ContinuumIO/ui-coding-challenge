var webpack = require("webpack");
var path = require("path");

// Ignore Typescript specification files
var ignore = new webpack.IgnorePlugin(/^\.spec\.ts$/);

var loaders = [
  {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=font/[hash:6].[ext]"},
  {test: /\.css$/, loader: "style!css"},
  {test: /\.scss$/, loader: "style!css!resolve-url!sass"},
  {test: /\.ts$/, loader: "ts-loader"},
  { test: /\.(jpg|png|gif)$/, loader: 'url-loader?limit=10000' },
  {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff&name=font/[hash:6].[ext]" }];

var extensions = ["", ".webpack.js", ".web.js", ".ts", ".js", ".scss"];

var includePaths = [path.resolve(__dirname, "../node_modules")];
var staticPath = "./static";

module.exports = [{
  entry: "./src/main.ts",
  output: {
    path: staticPath,
    filename: "bundle.js",
    library: "ui-coding-challenge",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  resolve: {extensions: extensions},
  module: {loaders: loaders},
  sassLoader: {includePaths: includePaths},
  devtool: "source-map"
}];
