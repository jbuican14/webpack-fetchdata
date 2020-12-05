const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public'),
    publicPath: 'public/',
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loder', 'css-looader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loder', 'css-looader', 'sass-loader'],
      },
    ],
  },
};
