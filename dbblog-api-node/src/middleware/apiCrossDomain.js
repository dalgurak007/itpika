/**
 *  Created by dalgurak on Mon Jan 07 2019 11:39:4
 */
module.exports = () => {
  return async (ctx, next) => {
    if (ctx.method == "OPTIONS") {
      // return ctx.state = 200;
      ctx.state = 200;
    }
    if (ctx.req.headers.accept) {
      ctx.req.headers.accept = ctx.req.headers.accept.replace("application/signed-exchange;v=b3",'');
    }
    if (ctx.req.headers.origin) {
      ctx.set("Access-Control-Allow-Origin", ctx.req.headers.origin);
    }
    // ctx.set("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept");
    ctx.set("Access-Control-Allow-Headers", "*");
    ctx.set("Access-Control-Allow-Methods", "*");
    ctx.set("Access-Control-Allow-Credentials", true);
    ctx.set("Access-Control-Max-Age", "3600");
    await next();
  };
};