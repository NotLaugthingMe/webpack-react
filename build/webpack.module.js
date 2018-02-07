/**
 * Created by chenlin on 2018/2/7 0007.
 */

const {ROOT_PATH} = require('../config/index');

const rules = [
  {
    enforce: 'pre',
    test: /\.(js)$/,
    exclude: /node_modules/,
    use: {
      loader: 'eslint-loader',
      options: {
        fix: false
      }
    }
  },
  {
    test: /\.(htm|html)$/i,
    use: {
      loader: 'html-withimg-loader'
    }
  },
  {
    test: /\.(css|scss)$/,
    use: ["style-loader", "css-loader","postcss-loader","sass-loader"],
    include: ROOT_PATH
  },
  {
    test: /\.(js)$/,
    exclude: /node_modules/,
    use: {
      loader: 'happypack/loader?id=js'
    }
  },
  {
    test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
    use: {
      loader: 'url-loader',
      options: {
        context: ROOT_PATH+'/src',
        limit: 10 * 1024,
        name: '[path][name].[hash:8].[ext]'
      }
    },
    include: ROOT_PATH
  }
];

module.exports = {
  rules
};
