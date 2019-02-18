const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: `style.css`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(jsx)$/,
        exclude: /node_modules/,
        use: [`babel-loader`],
        // use: [`babel-loader`, `eslint-loader`],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: `html-loader`,
          },
        ],
      },
      {
        test: /\.sass$/,
        use: [
          // fallback to style-loader in development
          `style-loader`,
          `css-loader`,
          `sass-loader`,
        ],
      },
    ],
  },
  resolve: {
    extensions: [`.jsx`, `.js`],
  },
};
