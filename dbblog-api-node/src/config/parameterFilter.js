/**
 *  Created by dalgurak on Wed Jan 02 2019 10:18:27
 * 参数过滤配置表
 */
const parameterFilterRouter = {
  // 注意：query 的defVal不支持Array，Object，只支持字符串
  // '/example': {
  //   body: ['organization','url',{field:'method',defVal:[]}],
  //   query: ['name',{field:'age',defVal:'4'}]
  // },
  '/thirdparty/interface/save': {
    body: ['organization','url','method','summary','alias']
  },
  '/thirdparty/interface': {
    body: [{field:'hasFoundedUserToken',defVal:true},'alias','userToken']
  },
};
module.exports =  parameterFilterRouter;