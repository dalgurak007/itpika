/**
 *  Created by dalgurak on Thu Nov 01 2018 15:48:45
 */


let handler = {
  set: (target, propKey) => {
    throw new Error(`Can't change Profile information ${propKey}`);
  }
}
module.exports = () => {
  return async (ctx, next) => {
    ctx.type = 'json';
    if (ctx.req.headers.accept !== '*') {
      ctx.type = ctx.req.headers.accept;
    }
    ctx.api = {
      services: ctx.app.services,
      uri: ctx.req.url.split('?')[0]
    };
    // 去除/wx路由前缀
    if (ctx.api.uri.substr(0,3) === '/wx') ctx.api.uri = ctx.api.uri.substr(3);
    ctx.api.services.config = new Proxy(ctx.api.services.config,handler);
    if (ctx.api.uri === '/favicon.ico') return ctx.body = '';
    ctx.api.services.responder.setup(ctx);
    await next();
  };
};