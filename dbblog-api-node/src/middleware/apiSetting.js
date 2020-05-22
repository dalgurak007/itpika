/**
 *  Created by dalgurak on Thu Nov 01 2018 15:48:45
 */



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
    if (ctx.api.uri === '/favicon.ico') return ctx.body = '';
    ctx.api.services.responder.setup(ctx);
    await next();
    ctx.set('Content-Type', 'application/json;charset=utf-8');
  };
};