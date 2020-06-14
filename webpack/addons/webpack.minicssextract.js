const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.css",
      chunkFilename: "[id].css"
    })
  ]
};
