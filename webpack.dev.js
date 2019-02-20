const path = require(`path`);
const merge = require(`webpack-merge`);
const common = require(`./webpack.common.js`);
const HtmlWebPackPlugin = require(`html-webpack-plugin`);

module.exports = merge(common, {
  mode: `development`,
  entry: {
    app: `./src/index.jsx`,
  },
  devtool: false,
  devServer: {
    contentBase: `./src`,
    host: `0.0.0.0`,
    disableHostCheck: true,
    historyApiFallback: true,
    port: 8080,
    open: false,
    proxy: {
      '/api/**': { target: `http://localhost:3001` },
    },
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: `./src/index.html`,
      filename: `./index.html`,
    }),
  ],
  output: {
    path: path.resolve(__dirname, `dist`),
    filename: `app.js`,
  },
});
