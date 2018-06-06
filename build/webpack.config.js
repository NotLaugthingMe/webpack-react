/**
 * Created by chenlin on 2018/2/7 0007.
 */
const path = require('path');
const entry = require('./webpack.entry');
const plugin = require('./webpack.plugin');
const mode = require('./webpack.module');
const {ROOT_PATH, BUILD_PATH, PUBLIC_PATH,isDev, ALIAS, port, proxyConfig} = require('../config/index');
console.log(2);
module.exports = function () {
  return {
    devtool: isDev ? 'eval-source-map' : false,
    entry,
    output: {
      path: BUILD_PATH, // 打包后所有文件存放的地方
      filename: `pkg/[name].${isDev ? '' : '[chunkhash:8].'}js`, // path测试
      publicPath: PUBLIC_PATH + '/'
    },
    resolve: {
      modules: [path.resolve(ROOT_PATH, 'node_modules')],
      extensions: ['.js', '.json'],
      alias: ALIAS
    },
    module: mode,
    plugins: plugin(),
    devServer: {
      historyApiFallback: false,
      compress: true,
      inline: true,
      hot: true,
      lazy: false,
      host: '0.0.0.0',
      port,
      proxy: proxyConfig
    }
  }
};
