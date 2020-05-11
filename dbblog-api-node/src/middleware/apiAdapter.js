/**
 *  Created by dalgurak on Thu Nov 08 2018 14:17:50
 */
const log = require('../lib/utils/log');
const apiCache = require('../core/apiCache');

module.exports = () => {
  return async (ctx, next) => {
    let router = ctx.api.uri;
    let api = apiCache.pairing(router);
    if (api) {
      try {
        if (ctx.req.method !== api.method.toLocaleUpperCase()&&ctx.req.method !== api.method.toLocaleLowerCase()) {
          log.error('[%s]-worker-[%s]: Request mode error, Need to be %s, pass %s', ctx.app.opt.workerId, ctx.api.uri, api.method, ctx.req.method);
          return ctx.body = ctx.api.services.responder.error(10001,'Request mode error, should be '+api.method).json;
        }
        await api.handler(ctx, next);
        // await next();
      } catch (e) {
        log.error(e.stack);
        if (!ctx.body) {
          return ctx.body = e.message;
        }
        return;
      }
    }
    await next();
  };
};

