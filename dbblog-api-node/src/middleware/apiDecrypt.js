/**
 *  Created by dalgurak on Fri Jan 04 2019 15:58:7
 *  参数解密中间件
 */
/*global global:true */
const decryptRules = require('../config/parameterDecryptRules');
const rsa = require('../lib/utils/rsa');

module.exports = () => {
  return async (ctx, next) => {
    // if (ctx.method === 'GET' || (global.env !== 'product' && ctx.get('securityVerification') === 'dalgurak')) {
    if (['GET','DELETE'].includes(ctx.method) || ctx.get('securityVerification') === 'dalgurak'||decryptRules.exclude.includes(ctx.api.uri)) {
      return await next();
    }
    // 判断是否需要解密参数
    if ((!decryptRules.all.includes(ctx.api.uri) && !decryptRules.isRsaUrl(ctx.api.uri))) {
      return await next();
    }
    if (!ctx.request.body.params||!ctx.request.body.key) {
      return ctx.body = ctx.api.services.responder.error(4000,'Request parameters are not encrypted').json;
    }
    // 解密参数  
    let passwd = rsa.rsaDecrypt(ctx.request.body.key, 'private', ctx.api.services.rsa.wechatApplet.private);
    // let bodyData = rsa.aesDecrypt(ctx.request.body.params, passwd);
    let bodyData = rsa.aesMetaFrontDecrypt(ctx.request.body.params,passwd);
    ctx.request.body = JSON.parse(bodyData);
    await next();
  };
};