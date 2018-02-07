/**
 * Created by chenlin on 2018/2/7 0007.
 */

const path = require('path');
const glob = require('glob');
const {ENTRY_PATH, ROOT_PATH}  = require('../config/index');


let entry = {};
let entryConfig = {};
if (ENTRY_PATH) {
  glob.sync(ENTRY_PATH).map(item=>{
    const temp = item.split('/');
    const proName = temp[temp.length-2];
    entry[`${proName}`] = path.resolve(ROOT_PATH,`src/app/${proName}/app.js`);
  });
}

module.exports = Object.assign({}, entryConfig, entry);

