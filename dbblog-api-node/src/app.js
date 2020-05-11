/**
 *  Created by dalgurak on Thu Nov 01 2018 15:7:21
 */
/*global process:true */

const Koa = require('koa');
const log = require('./lib/utils/log');
const koaBody = require('koa-body');
global.Promise = require('bluebird');
const process = require('process');
function startup(opt) {
  
  const app = new Koa();
  app.opt = opt;
  app.use(koaBody({
    multipart: true,
    strict:false,
    patchNode:true,
    maxFileSize: 200*1024*1024,
    // formidable: {
    //   uploadDir:require('path').join(__dirname,'public'), // 设置文件上传目录
    // }
  }));
  app.use(require('./middleware/apiCrossDomain')());
  app.use(require('./middleware/apiSetting')());
  // app.use(require('./middleware/apiDecrypt')());
  // app.use(require('./middleware/apiParameterFilter')());
  // app.use(require('./middleware/apiValidations')());
  // app.use(require('./middleware/apiLogSave')());
  app.use(require('./middleware/apiAdapter')());
  app.use(require('./middleware/apiError')());
  

  const port = parseInt(process.argv[2]) || 9999;
  (async()=>{
    try {
      app.services  = await require('./core/deployLoad').initialize(require('./core/deployConfig'));
      const server = app.listen(port);
      server.setTimeout(0);
      log.ok('[%d] nodeApi startup on port: %d', process.pid, port);
    } catch (error) {
      log.error('start app error: %s',error.message);
      log.stack(error);
    }
  })();

}

module.exports = startup;