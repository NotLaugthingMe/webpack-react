/**
 * Created by chenlin on 2018/2/7 0007.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');// 提取css文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const merge = require('webpack-merge');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });
const {BUILD_PATH, isDev} = require('../config/index');
const entry = require('./webpack.entry');

const createHappyPack = function (id, loaders) {
  return new HappyPack({
    id,
    loaders,
    threadPool: happyThreadPool
  });
};

module.exports = function () {
  const NODE_ENV = isDev ? 'development' : 'production';
  const plugin = Object.keys(entry).map(item=>{
    const chunks = [item, 'libs', 'manifest'];
    return new HtmlwebpackPlugin({
      filename: `page/${item}/index.html`,
      template: 'src/index.html',
      chunks,
      chunksSortMode: 'dependency',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
    });
  });
  plugin.push(
    createHappyPack('js', ['babel-loader?cacheDirectory']),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'libs',
      filename: 'pkg/common/[name].[chunkhash].js',
      chunksSortMode: 'dependency',
      minChunks: function (module, count) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({name: 'manifest', minChunks: 'Infinity'}),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackInlineSourcePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    })
  );
  if (isDev) {
    plugin.push(
      new webpack.HotModuleReplacementPlugin()
    );
  } else {
    plugin.push(
      new webpack.HashedModuleIdsPlugin(),
      new CleanWebpackPlugin(['*'], {
        root: BUILD_PATH,
        verbose: true,
        dry: false
      }),
      // 图片压缩
      new ImageminPlugin({
        disable: false,
        pngquant: {
          quality: '0-100', speed: 3
        },
        plugins: [
          imageminMozjpeg({
            quality: 85,
            progressive: true
          })
        ]
      }),
      new ExtractTextPlugin({
        filename: 'pkg/[name].[contenthash:8].css',
        allChunks: true
      }),
      new OptimizeCssAssetsPlugin(),
      new ParallelUglifyPlugin({
        uglifyJS: {
          compress: {
            // 在UglifyJs删除没有用到的代码时不输出警告
            warnings: false,
            // 删除所有的 `console` 语句
            // 还可以兼容ie浏览器
            drop_console: true,
            dead_code: true,
            loops: true,
            toplevel: true,
            if_return: true,
            // 内嵌定义了但是只用到一次的变量
            // collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true,
            drop_debugger: true // discard “debugger” statements
          },
          output: {
            // 删除所有的注释
            comments: false,
            // 最紧凑的输出
            beautify: false
          }
        }
      })
    );
  }
  return plugin;
};


