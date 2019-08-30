const path = require('path')
module.exports = {
  devtool: "source-map",
      output: {
    path: path.resolve(__dirname, "./dist"),
      filename: "app.js",
        publicPath: "/"
  },
  devServer: {
    historyApiFallback: true,
  }
};

// {
//   mode: "production",
//     devtool: "source-map",
//       output: {
//     path: path.resolve(__dirname, "./dist"),
//       filename: "app.js",
//         publicPath: "/"
//   },
//   optimization: {
//     minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
//   }
