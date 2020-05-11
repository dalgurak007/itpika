/**
 *  Created by dalgurak on Tue Jan 08 2019 10:24:34
 */
const tools = require('../lib/utils/tools');
const httpUtils = require('../lib/utils/httpUtils');
module.exports = () => {
  return async (ctx, next) => {
    if (ctx.request.body.userToken === null || ctx.request.body.userToken === undefined || ctx.request.body.userToken === '') {
      return await next();
    }
    let redisCli = ctx.api.services.redisPool.getConnection();
    let ret = await redisCli.get(ctx.api.services.config.userTokenPrefix+ctx.request.body.userToken);
    if (ret) {
      ctx.request.body.userToken = {
        token: ctx.request.body.userToken,
        value: JSON.parse(ret)
      };
    } else {
      // 第三方跳转从创立获取token
      const cs = ctx.api.services;
      const foundedKey = cs.config.foundedKey;
      ret = await httpUtils.reqHttp(cs.interfaces.founded.getUserInfo.url, cs.interfaces.founded.getUserInfo.method, {usertoken: ctx.request.body.userToken}, tools.getFoundedToken(foundedKey.accesseId, foundedKey.secretKey));
      if (ret.statusCode !== 200) return ctx.body = cs.responder.error(4004, '请求失败，请稍后重试！').json;
      ret = JSON.parse(ret.data);
      if (ret.code !== 0) return ctx.body = cs.responder.error(50000, 'userToken 无效！',ret).json;
      // 存入redis
      let redisCli = cs.redisPool.getConnection();
      redisCli.setex(cs.config.userTokenPrefix+ret.data.usertoken, cs.config.userLoginExists, JSON.stringify(ret.data.user));
      redisCli.hset(cs.config.onlineUser, ret.data.user.userId, ret.data.usertoken);
      ctx.request.body.userToken = {
        token: ctx.request.body.userToken,
        value: ret.data.user
      };
    }
    
    await next();
  };
};