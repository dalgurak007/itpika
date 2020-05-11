/**
 *  Created by dalgurak on Thu Nov 08 2018 14:19:51
 */
/*global __dirname:true */

const path = require('path');
const fs = require('fs');
const log = require('../lib/utils/log');
const apiCache = {
  store: {},
  pairing(router) {
    if (typeof this.store[router] === 'undefined') {
      const realpath = path.join(__dirname,'..','api',router);
      if (fs.existsSync(realpath+'.js') || fs.existsSync(realpath+'/index.js')) {
        this.store[router] = require(realpath);
        if (!this.store[router].method) {
          this.store[router].method = 'GET';
        }
      } else {
        log.error('Not Found method: %s',router.substr(router.lastIndexOf('/')));
        return null;
      }
    }
    return this.store[router];
  }
}

module.exports = apiCache;