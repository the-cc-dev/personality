var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/api.js',
  output: {
    filename: 'personality.js',
    library: 'cdxEditorPersonality',
  },
  module: {
    rules: [
      {
          test : /\.(png|jpg|svg)$/,
          use : "file-loader?name=[path][name].[ext]"
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: {
              minimize: 1,
              importLoaders: 1
            }
          },
          'postcss-loader'
        ])
      },
      {
        test : /\.js$/,
        loader: "eslint-loader",
        options : {
          fix: true
        }
      }
    ]
  },
  plugins : [
    new ExtractTextPlugin({
      filename: 'personality.css',
      allChunks: true,
    }),
  ],
  watch: true,
};