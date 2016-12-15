var webpack = require("webpack");
var path = require("path");
var autoprefixer = require('autoprefixer');

// Ignore Typescript specification files
var ignore = new webpack.IgnorePlugin(/^\.spec\.ts$/);

var loaders = [
  // SCSS should be automatically transpiled
  {test: /\.css$/, loader: "style!css?importLoaders=1!postcss"},
  {test: /\.scss$/, loader: "style!css?importLoaders=1!postcss!resolve-url!sass"},
  // Support both Typescript and ES2015 Javascript
  {test: /\.js$/, loader: 'babel-loader',
   exclude: /(node_modules|bower_components)/, query: {presets: ['react-app']}},
  {test: /\.ts$/, loader: "ts-loader"},

  {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=font/[hash:6].[ext]"},
  {test: /\.(jpg|png|gif)$/, loader: 'url-loader?limit=10000' },
  {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff&name=font/[hash:6].[ext]" }
];

var extensions = ["", ".webpack.js", ".web.js", ".ts", ".js", ".scss"];

var includePaths = [path.resolve(__dirname, "../node_modules")];
var staticPath = "./static";

module.exports = [{
  entry: "./src/main.js",
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
  postcss: function() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ]
      }),
    ];
  },
  devtool: "source-map"
}];
