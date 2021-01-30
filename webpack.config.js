const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  entry: {
    index: './dev/src/index.js',
    another: './dev/src/vendor.js',
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./build"),
    publicPath: ''
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  mode: "production",
  devServer: {
    contentBase: [path.resolve(__dirname, './build'), path.resolve(__dirname + '/assets')],
    index: 'index.html',
    port: 9000,
    writeToDisk: true
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|gif|png|jpg|jpeg|mp4|webm|webp)(\?v=\d+\.\d+\.\d+)?$/i,
        use: [
          'file-loader', {
            loader: 'image-webpack-loader',
            options: {
              name: '[name].[ext]',
              enforce: 'pre',
              mozjpeg: {
                progressive: true,
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          attributes: {
            list: [{
                tag: 'img',
                attribute: 'src',
                type: 'src',
              },
              {
                tag: 'img',
                attribute: 'data-src',
                type: 'src',
              },
              {
                tag: 'img',
                attribute: 'data-srcset',
                type: 'srcset',
              }
            ],
            urlFilter: (attribute, value, resourcePath) => {
              /**
               * The `attribute` argument contains a name of the HTML attribute.
               * The `value` argument contains a value of the HTML attribute.
               * The `resourcePath` argument contains a path to the loaded HTML file.
               */

              if (/example\.pdf$/.test(value)) {
                return false;
              }

              return true;
            },
            root: '.',
          },
        },
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './dev/src/index.html',
      title: 'Art: home',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './dev/src/work.html',
      title: 'Art: work',
      filename: 'work.html'
    }),
    new HtmlWebpackPlugin({
      template: './dev/src/about.html',
      title: 'Art: about',
      filename: 'about.html'
    }),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        // Lossless optimization with custom option
        // Feel free to experiment with options for better result for you
        plugins: [
          ['gifsicle', {
            interlaced: true
          }],
          ['jpegtran', {
            progressive: true
          }],
          ['optipng', {
            optimizationLevel: 5
          }],
          [
            'svgo',
            {
              plugins: [{
                removeViewBox: false,
              }, ],
            },
          ],
        ],
      },
    }),
  ]
};