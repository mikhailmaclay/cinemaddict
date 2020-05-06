const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
  mode: `development`,
  entry: `./src/index.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          `style-loader`,
          `css-loader`,
          `sass-loader`,
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: `babel-loader`,
          options: {
            presets: [`@babel/preset-env`],
            plugins: [
              `@babel/plugin-transform-runtime`
            ]
          }
        }
      }
    ]
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `public`),
    watchContentBase: true,
    liveReload: true,
    historyApiFallback: true
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`]
    })
  ]
};
