/**
 *  Created by dalgurak on Thu Dec 27 2018 20:44:45
 */
/*global Buffer:true */
const Crypto = require('./crypto/cryptojs').Crypto;
const crypto = require('crypto');

const algorithm = 'AES128';
const key_flag = '1234567890abcdef';
const charArr = '`1234567890~!@#$%^&*()_+-=qwertyuiop[]\\{}|asdfghjkl;\':"zxcvbnm,./<>?QWERTYUIOPASDFGHJKLZXCVBNM\n ';

exports.rand = (min, max) => {
  return Math.floor(Math.random()*(max-min+1)+min);
};

exports.randomPassword = () => {
  const indexs = exports.rand(10000000,99999999).toString();
  let ret = '';
  let i=0, j=0;
  for(let c of indexs){
    i = ~~c;
    i += j*12 + i%2;
    ret += charArr[i].toString() + c;
    j++;
  }
  return ret;
};

exports.aesEncrypt = (rawStr, key = key_flag) => {
  key = (key.length === 16) ? key : key_flag;
  const cipher = crypto.createCipheriv(algorithm, key, key);
  let crypted = cipher.update(rawStr,'utf8','base64');
  crypted += cipher.final('base64');
  return crypted;
};
// exports.aesEncrypt = (rawStr, key = key_flag, iv = exports.iv(key)) => {
//   key = (key.length === 16) ? key : key_flag;
//   const cipher = crypto.createCipheriv(algorithm, key, iv);
//   let crypted = cipher.update(rawStr,'utf8','base64');
//   crypted += cipher.final('base64');
//   return crypted;
// };

exports.aesDecrypt = (encryptStr, key = key_flag) => {
  key = (key.length === 16) ? key : key_flag;
  const decipher = crypto.createDecipheriv(algorithm, key, key);
  let deciphed = decipher.update(encryptStr,'base64');
  deciphed += decipher.final();
  return deciphed;
};
// exports.aesDecrypt = (encryptStr, key = key_flag, iv = exports.iv(key)) => {
//   key = (key.length === 16) ? key : key_flag;
//   const decipher = crypto.createDecipheriv(algorithm, key, iv);
//   let deciphed = decipher.update(encryptStr,'base64');
//   deciphed += decipher.final();
//   return deciphed;
// };

exports.rsaEncrypt = (rawStr, keyType = 'public', key, encoding = 'base64') => {
  return crypto[keyType+'Encrypt']({
    key: key,
    padding: crypto.constants.RSA_PKCS1_PADDING
  }, Buffer.from(rawStr)).toString(encoding);
};


exports.rsaDecrypt = (encryptString, keyType = 'public', key) => {
  return crypto[keyType+'Decrypt']({
    key: key,
    padding: crypto.constants.RSA_PKCS1_PADDING
  }, Buffer.from(encryptString, 'base64')).toString();
};

exports.md5 = (str, encoding = 'hex') => {
  return crypto.createHash('MD5').update(str).digest(encoding);
};

exports.iv = (passwd) => {
  return exports.md5(passwd).substr(0,16);
};

exports.aesMetaFrontDecrypt = (encryptStr, key) => {
  // 对称解密使用的算法为 AES-128-CBC，数据采用PKCS#7填充
  var mode = new Crypto.mode.CBC(Crypto.pad.pkcs7);
  let str = Crypto.AES.decrypt(encryptStr, Crypto.util.bytesToBase64(key), {
    asBpytes:true,
    iv: Crypto.util.bytesToBase64(exports.iv(key)),
    // iv: Crypto.util.bytesToBase64(key),
    mode: mode
  });
  return str;
};
exports.aesMetaFrontEncrypt = (rawData, key) => {
  // 对称解密使用的算法为 AES-128-CBC，数据采用PKCS#7填充
  let mode = new Crypto.mode.CBC(Crypto.pad.pkcs7);
  // let iv = exports.iv(key);
  if (typeof rawData !== 'string') rawData = JSON.stringify(rawData);
  let params =  Crypto.AES.encrypt(rawData, Crypto.util.bytesToBase64(key), {
    asBpytes:true,
    mode: mode,
    // iv:Crypto.util.bytesToBase64(iv),
    iv:Crypto.util.bytesToBase64(key),
  });
  return params;
};

exports.hash = (algorithm = 'md5',rawStr,encoding='hex',input_encoding='utf8') => {
  return crypto.createHash(algorithm).update(rawStr,input_encoding).digest(encoding);
};
