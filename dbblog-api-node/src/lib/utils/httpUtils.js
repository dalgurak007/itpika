/**
 *  Created by dalgurak on Thu Jan 03 2019 15:46:49
 */
/*global Buffer:true */

const tools = require('./tools');
const fs = require('fs');
const request = require('request');
var QcloudSms = require("qcloudsms_js");


exports.reqHttps = async (url, method = 'GET', postData, headersParameters = {}) => {
  if (headersParameters['Content-Type']&&headersParameters['Content-Type'].indexOf('application/json')>=0) {
    postData = JSON.stringify(postData);
  } else {
    postData = tools.objectEncoding(postData);
  }
  let headers = Object.assign({}, {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }, headersParameters);
  return new Promise((resolve, rej) => {
    request(url,{headers,method,body:postData}, (err, res, body)=>{
      if (err) {
        resolve({statusCode: 500, message: err.message});
        return;
      }
      if (res.statusCode !== 200) {
        resolve({statusCode: res.statusCode, message: err?err.message:body});
        return;
      }
      res.setEncoding('utf8');
      resolve({ data: body, headers: res.headers, statusCode: res.statusCode });
    });
  });
};
// exports.reqHttps = async (url, method = 'GET', postData, headersParameters) => {
//   postData = querystring.stringify(postData);
//   let headers = Object.assign({}, {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Content-Length': Buffer.byteLength(postData)
//   }, headersParameters);
//   return new Promise((resolve, rej) => {
//     const req = https.request(url, {
//       method,
//       headers
//     }, (res) => {
//       res.setEncoding('utf8');
//       let data = '';
//       res.on('data', (chunk) => {
//         data += chunk;
//       });
//       res.on('end', () => {
//         resolve({ data, headers: res.headers, statusCode: res.statusCode });
//       });
//       res.on('error', (e) => {
//         resolve({statusCode: -1, message: e.message});
//       })
//     });
//     req.on('error', (e) => {
//       resolve({statusCode: -1, message: e.message});
//     });
//     // 写入数据到请求主体
//     if (postData !== undefined && postData !== null) {
//       req.write(postData);
//     }
//     req.end();
//   });
// };
exports.reqHttp = async (url, method = 'GET', postData, headersParameters = {}) => {
  // postData = querystring.stringify(postData);
  if (headersParameters['Content-Type']&&headersParameters['Content-Type'].indexOf('application/json')>=0) {
    postData = JSON.stringify(postData);
  } else {
    postData = tools.objectEncoding(postData);
  }
  let headers = Object.assign({}, {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }, headersParameters);
  return new Promise((resolve, reject)=>{
      request(url,{headers,method,body:postData,timeout:5000}, (err, res, body)=>{
        if (err) {
          resolve({statusCode: 500, message: err.message});
          return;
        }
        if (res.statusCode !== 200) {
          resolve({statusCode: res.statusCode, message: err?err.message:body});
          return;
        }
        res.setEncoding('utf8');
        resolve({ data: body, headers: res.headers, statusCode: res.statusCode });
      });
  });
};

exports.reqHttpCallback = (url, method = 'GET', postData, headersParameters = {},callback) => {
  if (headersParameters['Content-Type']&&headersParameters['Content-Type'].indexOf('application/json')>=0) {
    postData = JSON.stringify(postData);
  } else {
    postData = tools.objectEncoding(postData);
  }
  let headers = Object.assign({}, {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }, headersParameters);
    request(url,{headers,method,body:postData}, (err, res, body)=>{
      if (err||res.statusCode !== 200) {
        if (callback) callback(err?err.message:body);
        return;
      }
      res.setEncoding('utf8');
      callback(null,body);
    });
};

exports.sendSmsCode = async (appid, appKey, smsSign, templateId, phone, params) => {
  if (!(phone instanceof Array) && phone.length <= 0) throw new Error('the phone must is a array and length greater than 0');
  // 实例化QcloudSms
  let qcloudsms = QcloudSms(appid, appKey);
  let ssender = qcloudsms.SmsMultiSender();
  await new Promise((resolve, reject) => {
    ssender.sendWithParam(86, phone, templateId,
      params, smsSign, "", "", async (err, res, resData) => {
          if (err) {
            // console.log("err: ", err);
            resolve(-1);
          } else {
            // console.log("request data: ", res.req);
            // console.log("response data: ", resData);
            if (resData.result == 0) {
              resolve(-1);
            } else {
              resolve(0);
            }
          }
      });  // 签名参数未提供或者为空时，会使用默认签名发送短信
  })
};

exports.fileRequest = async(url,method='post',headers,body,files) => {
  let boundaryKey = Math.random().toString(16);
  let endData = '\r\n----' + boundaryKey + '--';
  let filesLength = 0, content;
  // 初始数据，把post过来的数据都携带上去
  var rslt = [];
  Reflect.ownKeys(body).forEach(key=> {
    arr = ['\r\n----' + boundaryKey + '\r\n'];
    arr.push('Content-Disposition: form-data; name="' + key + '"\r\n\r\n');
    arr.push(body[key]);
    rslt.push(arr.join(''));
  });
  content = rslt.join('');

  // 组装数据
  Reflect.ownKeys(files).forEach(key=> {
    if (!Reflect.has(files,key)) {
      delete files.key;
      return;
    }
    // if (files[key] instanceof Array) {
      // files[key].forEach(v=>{

      // });
    // }
    content += '\r\n----' + boundaryKey + '\r\n' +
        'Content-Type: application/octet-stream\r\n' +
        'Content-Disposition: form-data; name="' + key + '"; ' +
        'filename="' + files[key].name + '"; \r\n' +
        'Content-Transfer-Encoding: binary\r\n\r\n';
    files[key].contentBinary = Buffer.from(content, 'utf-8');
    filesLength += files[key].contentBinary.length + fs.statSync(files[key].path).size;
  });
  return await new Promise((resolve, rej) => {
    let req = request(url,{headers,method}, (err, res, body)=>{
      if (err) {
        resolve({statusCode: -1, message: err.message});
        return;
      }
      res.setEncoding('utf8')
      resolve({ data: body, headers: res.headers, statusCode: res.statusCode });
    });
    req.setHeader('Content-Type', 'multipart/form-data; boundary=--' + boundaryKey);
    req.setHeader('Content-Length', filesLength + Buffer.byteLength(endData));
    req.on('error', (e) => {
      resolve({statusCode: -1, message: e.message});
    });
    // 写入数据到请求主体
    if (content !== undefined && content !== null) {
      req.write(content);
    }
    // 执行上传
    var allFiles = Reflect.ownKeys(files);
    var fileNum = allFiles.length;
    var uploadedCount = 0;
    allFiles.forEach(key=> {
      // req.write(files[key].contentBinary);
      var fileStream = fs.createReadStream(files[key].path, {bufferSize: 4 * 1024});
      fileStream.on('end', function () {
        // 上传成功一个文件之后，把临时文件删了
        fs.unlink(files[key].path,(err)=>{});
        uploadedCount++;
        if (uploadedCount == fileNum) {
          // 如果已经是最后一个文件，那就正常结束
          req.end(endData);
        }
      });
      fileStream.pipe(req, {end: false});
    });
  });
}
// exports.fileRequest = async(url,method='post',headers,body,files,type='http') => {
//   let boundaryKey = Math.random().toString(16);
//   let endData = '\r\n----' + boundaryKey + '--';
//   let filesLength = 0, content;
//   // 初始数据，把post过来的数据都携带上去
//   var rslt = [];
//   Reflect.ownKeys(body).forEach(key=> {
//     arr = ['\r\n----' + boundaryKey + '\r\n'];
//     arr.push('Content-Disposition: form-data; name="' + key + '"\r\n\r\n');
//     arr.push(body[key]);
//     rslt.push(arr.join(''));
//   });
//   content = rslt.join('');

//   // 组装数据
//   Reflect.ownKeys(files).forEach(key=> {
//     if (!Reflect.has(files,key)) {
//       delete files.key;
//       return;
//     }
//     // if (files[key] instanceof Array) {
//       // files[key].forEach(v=>{

//       // });
//     // }
//     content += '\r\n----' + boundaryKey + '\r\n' +
//         'Content-Type: application/octet-stream\r\n' +
//         'Content-Disposition: form-data; name="' + key + '"; ' +
//         'filename="' + files[key].name + '"; \r\n' +
//         'Content-Transfer-Encoding: binary\r\n\r\n';
//     files[key].contentBinary = Buffer.from(content, 'utf-8');
//     filesLength += files[key].contentBinary.length + fs.statSync(files[key].path).size;
//   });
//   return await new Promise((resolve, rej) => {
//     let requestType = (type === 'http')?http:https; 
//     const req = requestType.request(url, {
//       method,headers
//     }, (res) => {
//       res.setEncoding('utf8');
//       let data = '';
//       res.on('data', (chunk) => {
//         data += chunk;
//       });
//       res.on('end', () => {
//         resolve({ data, headers: res.headers, statusCode: res.statusCode });
//       });
//       res.on('error', (e) => {
//         resolve({statusCode: -1, message: e.message});
//       })
//     });
//     req.setHeader('Content-Type', 'multipart/form-data; boundary=--' + boundaryKey);
//     req.setHeader('Content-Length', filesLength + Buffer.byteLength(endData));
//     req.on('error', (e) => {
//       resolve({statusCode: -1, message: e.message});
//     });
//     // 写入数据到请求主体
//     if (content !== undefined && content !== null) {
//       req.write(content);
//     }
//     // 执行上传
//     var allFiles = Reflect.ownKeys(files);
//     var fileNum = allFiles.length;
//     var uploadedCount = 0;
//     allFiles.forEach(key=> {
//       // req.write(files[key].contentBinary);
//       var fileStream = fs.createReadStream(files[key].path, {bufferSize: 4 * 1024});
//       fileStream.on('end', function () {
//         // 上传成功一个文件之后，把临时文件删了
//         fs.unlink(files[key].path,(err)=>{});
//         uploadedCount++;
//         if (uploadedCount == fileNum) {
//           // 如果已经是最后一个文件，那就正常结束
//           req.end(endData);
//         }
//       });
//       fileStream.pipe(req, {end: false});
//     });
//   });
// }