/**
 * Created by chenlin on 2018/2/7 0007.
 */

const path = require('path');
const ROOT_PATH = path.resolve(__dirname, '../');
const isDev = /^dev/g.test(process.env.NODE_ENV);

module.exports = {
  isDev,
  ROOT_PATH,
  ENTRY_PATH: 'src/app/**/app.js',
  BUILD_PATH: path.resolve(ROOT_PATH, './dist'),
  PUBLIC_PATH: '/webpack-react',
  port: 9000,
  proxyConfig: {
    "/har-cashier-front/api": "http://192.168.3.117:7300/mock/5a7903a5934a2c00178794ab"
  },
  ALIAS: {// 路径映射设置
    'components': path.resolve(ROOT_PATH, 'src/components'),
    'common': path.resolve(ROOT_PATH, 'src/common'),
    'utils': path.resolve(ROOT_PATH, 'src/utils'),
    'image': path.resolve(ROOT_PATH, 'src/image'),
    'service': path.resolve(ROOT_PATH, 'src/service')
  }
};
