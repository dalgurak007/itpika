/**
 * 
 *  Created by dalgurak on Thu Jan 03 2019 11:27:58
 */
/*global Math:true process:true */

const rsa = require('./rsa');
// const captchapng2 = require('captchapng2');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
/**
 * 获取出入境请求需要的序列号
 */
exports.serialNoMaker = function() {
  let serialNo = 1;
  function ur2(number) {
    return number < 10 ? '0' + number : number;
  }

  function ur5() {
    let result = serialNo.toString();
    if (serialNo > 99999)
      serialNo = 1;
    let len = serialNo.toString().length;
    for (let i = 0; i < 5 - len; i++)
      result = '0' + result;
    return result;
  }
  serialNo++;
  let now = new Date();
  let year = now.getFullYear() - 100;
  let month = ur2(now.getMonth() + 1);
  let day = ur2(now.getDate());
  return `100${year}${month}${day}${ur2(now.getHours())}${ur2(now.getMinutes())}${now.getSeconds()}${ur5()}`;
};

/**
 * 获取出入境接口调用请求他签名
 */
exports.encryptExitEntrySignature = (appId, appSecret) => {
  let time = Date.now();
  return {
    xf_appId: appId,
    xf_timestamp: time,
    xf_signature: rsa.md5(`${appId};${appSecret};${time}`,'base64'),
  };
};

/**
 * 获取创立接口调用请求头
 * @param {*} accesseId 
 * @param {*} secretKey 
 */
exports.getFoundedToken = (accesseId, secretKey) => {
  let timeStamp = Date.now();
  let randomNum = parseInt(Math.random() * 10000);
  let apptoken = rsa.md5(accesseId + timeStamp + randomNum + secretKey);
  return {
    apptoken,accesseId,timeStamp,randomNum
  };
};


// exports.getImgCodePng = (num = 4, storePath = 'login', width = 80, height = 30) => {
//   let code = Math.floor(Math.random()*10000);
//   let png = new captchapng2(width,height, code);
//   let codeName = Date.now()+'.png';
//   fs.writeFileSync(path.join(process.cwd(),'public','imgcode',storePath,codeName),png.getBuffer());
//   return {code,path:`/unit/imgcode/${storePath}/${codeName}`};
// };
// exports.getImgCodeLable = (num = 4, width = 80, height = 30) => {
//   let code = Math.floor(Math.random()*(10 ** num));
//   let png = new captchapng2(width,height, code);
//   return {code,data:`data:image/jpeg;base64,${png.getBuffer().toString('base64')}`};
// };

/**
 * 参数排序方法
 */
exports.sortParam = (params) => {
  let pk = Reflect.ownKeys(params);
  if (pk.length<=0) return '';
  pk = pk.sort((a,b)=>{
    let tmp = Math.min(a.length,b.length)
    for (let i=0;i<tmp;i++) {
      if (a.charCodeAt(i)===b.charCodeAt()) continue;
      return a.charCodeAt(i)>b.charCodeAt(i);
    }
  });
  let str = '';
  // pk.forEach(v=>str+=v+(typeof params[v] !== 'object'?params[v]:JSON.stringify(params[v])));
  pk.forEach(v=>{
    if (typeof params[v] !== 'object') {
      str+=v+params[v]
    } else {
      str+= v+JSON.stringify(params[v])
    }
  });
  // pk.forEach(v=>str+=v+JSON.stringify(params[v]));
  return str;
}

exports.objectEncoding = obj => {
  let s = '';
  for (let k in obj) {
    s += k+'='+ (typeof obj[k] !== 'object'?obj[k]:qs.escape(JSON.stringify(obj[k])))+'&';
  }
  return s.substring(0,s.length-1);
};
exports.objectParamEncoding = obj => {
  let s = '';
  for (let k in obj) {
    s += k+'='+ (typeof obj[k] !== 'object'?qs.escape(obj[k]) : qs.escape(JSON.stringify(obj[k])))+'&';
  }
  return s.substring(0,s.length-1);
};

/**
 * 邮政速递接口请求数据初始化
 */
exports.emsReqDataInit = (appkey,authorization,version) => {
  return {
    app_key:appkey,
    authorization:authorization,
    version:version,
    charset:'UTF-8',
    format:'json',
    timestamp:new Date().toLocaleString(),
  }
};