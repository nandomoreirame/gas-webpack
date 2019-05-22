const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const GasPlugin = require('gas-webpack-plugin')

const {
  name,
  description,
  homepage,
  version,
  license
} = require('./package.json')

const {
  resolve,
  join
} = require('path')

const babelrc = require('./.babelrc')

const mode = process.env.NODE_ENV || 'development'
const isProduction = mode === 'production'
const ROOT_PATH = resolve(__dirname, './')
const SOURCE_PATH = join(ROOT_PATH, 'src')
const OUTPUT_PATH = join(ROOT_PATH, 'dist')

module.exports = {
  mode,
  context: __dirname,
  entry: {
    'gas-webpack': join(__dirname, 'src', `index.js`)
  },
  name: 'gas-webpack',
  devtool: '',
  output: {
    publicPath: '/',
    path: OUTPUT_PATH,
    filename: `[name]-${version}.gs`,
    libraryTarget: 'this'
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: babelrc
      }
    }]
  },
  optimization: {
    minimize: isProduction,
    minimizer: [new UglifyJsPlugin({
      include: /\.min\.js$/,
      // test: /\.js(\?.*)?$/i,
      uglifyOptions: {
        ie8: true,
        warnings: false,
        mangle: false,
        compress: {
          properties: false,
          warnings: false,
          drop_console: false
        },
        output: {
          beautify: !isProduction
        }
      }
    })]
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      SOURCE_PATH,
      join(__dirname, 'node_modules')
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(version)
    }),
    new CopyWebpackPlugin([{
      from: join(SOURCE_PATH, `views`, `**`, `*.html`),
      flatten: true,
      to: OUTPUT_PATH
    }, {
      from: join(ROOT_PATH, `env`, `appsscript.${mode}.json`),
      to: join(OUTPUT_PATH, `appsscript.json`)
    }, {
      from: join(ROOT_PATH, `env`, `.clasp.${mode}.json`),
      to: join(ROOT_PATH, `.clasp.json`)
    }]),
    new GasPlugin({
      comments: false
    }),
    new webpack.BannerPlugin({
      banner: `${name} - ${description}
    @link ${homepage}
    @version ${version}
    @license ${license}`
    })
  ]
}
