const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: `./src/index.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`),
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `public`),
    watchContentBase: true,
    liveReload: true,
    historyApiFallback: true
  }
};
