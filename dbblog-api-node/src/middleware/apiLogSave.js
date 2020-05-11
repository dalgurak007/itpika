/**
 *  Created by dalgurak on Tue Nov 06 2018 16:4:24
 */
const log = require('../lib/utils/log');
const logModule = require('../modules/dbAll');
const logCache = [];
// 存储操作日志
module.exports = () => {
    return async (ctx, next) => {
      if (ctx.query.dalgurak === 'dalgurak') {
        return await next();
      }
      const s = Date.now();
      let uri = ctx.api.uri;
      if (ctx.request.body.alias && uri.indexOf('/thirdparty') === 0) {
        let tmp = uri.replace('/thirdparty/','');
        let i = tmp.indexOf('/');
        tmp = tmp.substring(0,i === -1 ? tmp.length : i);
        let t = ctx.api.services.interfaces[tmp];
        uri =t? ctx.api.services.interfaces[tmp][ctx.request.body.alias]?ctx.api.services.interfaces[tmp][ctx.request.body.alias].url:null:null;
      }
      logModule.init({
          mongo: ctx.api.services.mongo,
          mongoDatabase: ctx.api.services.mongoDatabase
      });
      let ip = ctx.ip.split('::ffff:');
      let data = { uri, requestTime:s, ip: ip[1] };
      if (ctx.request.body.userToken) {
        data.user = ctx.request.body.userToken.value.name;
        data.userId = ctx.request.body.userToken.value._id;
      }
      await next();
      let consumptionTime = Date.now() - s;
      data.consumptionTime = consumptionTime;
      let params = Object.assign({},ctx.request.body,ctx.query,{userToken:ctx.request.body.userToken?ctx.request.body.userToken.token:""});
      log.notic('[%s]-worker-[%s]: %s, use time: %s ms, params: %j', ctx.app.opt.workerId, ctx.req.method, ctx.api.uri, consumptionTime, params);
      // if (ctx.query.dalgurak!=='dalgurak') logCache.push(data);
      if (logCache.length >= 250) { // 批量插入日志
        logModule.insertMany('log', logCache.splice(0,250));
      }
    };
};