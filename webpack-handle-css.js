const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    app: path.join(__dirname, 'app/resources/app-style.js'),
  },
  output: {
    path: path.join(__dirname, '/static/styles'),
    filename: '[name].js',
  },
  module: {
    rules: [{
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false
          }
        },
        exclude: /node_modules/,
      }, {
        test: /\.(eot|svg|ttf|woff).*$/,
        loader: 'url-loader',
        options: {
          limit: 15000,
        },
      },
      {
        test: /\.(gif|jpe?g|png|ico).*$/,
        loader: 'url-loader',
        options: {
          limit: 15000,
        },
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              minimize: true
            }
          }],
        }),
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
          ],
        }),
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [{
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: true
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true
              }
            },
          ],
        }),
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false,
      allChunks: true,
    }),
  ],
}
