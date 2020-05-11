/**
 *  Created by dalgurak on Tue Nov 06 2018 16:4:24
 */
module.exports = () => {
  return async (ctx)=>{
    ctx.state = 404;
    if (!ctx.body) return ctx.body = '404 Not found';
  };
};