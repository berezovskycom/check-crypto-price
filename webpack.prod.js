const merge = require(`webpack-merge`);
const common = require(`./webpack.common.js`);
const path = require(`path`);
const UglifyJSPlugin = require(`uglifyjs-webpack-plugin`);
const HtmlWebPackPlugin = require(`html-webpack-plugin`);

module.exports = merge(common, {
  mode: `production`,
  entry: {
    app: `./src/index.jsx`,
  },
  devtool: `source-map`,
  stats: {
    colors: false,
    hash: true,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: true,
    children: true,
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
        uglifyOptions: {
          output: {
            comments: false,
          },
          compress: {
            inline: false,
          },
        },
      }),
    ],
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: `vendor_app`,
          chunks: `all`,
          minChunks: 2,
        },
      },
    },
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: `./src/index.html`,
      filename: `./index.html`,
      inject: true,
      minify: true,
    }),
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname, `prod`),
  },
});
