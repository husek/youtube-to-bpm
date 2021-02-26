const path = require('path')
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const rootPath = path.resolve(__dirname, '..')

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  devtool: 'source-map',
  entry: path.resolve(rootPath, 'electron', 'main.ts'),
  target: 'electron-main',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.FLUENTFFMPEG_COV': false
    })
  ],
  node: {
    __dirname: true
  },
  externals: [
    nodeExternals(),
    { '@ffmpeg-installer/ffmpeg': { commonjs: '@ffmpeg-installer/ffmpeg' } }
  ],
  output: {
    path: path.resolve(rootPath, 'dist'),
    filename: '[name].js'
  }
}
