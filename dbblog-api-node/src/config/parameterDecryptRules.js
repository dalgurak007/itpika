/**
 *  Created by dalgurak on Fri Jan 04 2019 16:54:47
 *  body参数解析配置表
 */


const parameterDecryptRouter = {
  like: [ // 模糊匹配
    '/security/',
    '/user/',
    '/card/',
    '/myAddress/',
    '/express/',
    '/upload/',
    '/base/'
  ],
  all: [ // 完全匹配
    '/thirdparty/exitAndEntry',
    '/thirdparty/founded/convenienceServices',
    '/thirdparty/founded',
    '/thirdparty/register',
    '/thirdparty/whz',
    '/thirdparty/scga',
    '/thirdparty/scga/direct',
  ],
  exclude: [
    "/express/ems/mail/stateFeedback",
    "/base/info/serverListen",
    // "/security/authentication/realPeopleCertification",
  ],
  isRsaUrl(uri) {
    for (let v of this.like) {
      if (uri.indexOf(v) === 0) return true;
    }
    return false;
  }
};

module.exports =  parameterDecryptRouter;