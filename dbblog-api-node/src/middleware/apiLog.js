/**
 *  Created by dalgurak on Tue Nov 06 2018 16:4:24
 */
const log = require('../lib/utils/log');
// 存储操作日志
module.exports = () => {
  return async (ctx, next) => {
    if (ctx.query.dalgurak === 'dalgurak') {
      return await next();
    }
    const s = Date.now();
    await next();
    let consumptionTime = Date.now() - s;
    let params = Object.assign({},ctx.request.body,ctx.query);
    log.notic('[%s]-worker-[%s]: %s, use time: [%s ms], params: %j, ip: [%s]', ctx.app.opt.workerId, ctx.req.method, ctx.api.uri, consumptionTime, params, ctx.ip.split('::ffff:'));
    
  };
};