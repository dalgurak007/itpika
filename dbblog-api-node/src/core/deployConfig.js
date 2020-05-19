/**
 *  Created by dalgurak on Wed Nov 07 2018 10:48:55
 */
const responderModule = require('../modules/responderModule');
const mysqlModule = require('../modules/mysqlModule');
// const redisPoolModule = require('../lib/modules/redisPoolModule');

let handler = {
  set: (target, propKey) => {
    throw new Error(`Can't change Profile information ${propKey}`);
  }
}
const deployLoad = {
  async initialize(deployConfig) {
    // const redisConfig = deployConfig.db.redis || false;
    let services = {
      // redisPool: redisPoolModule.createPool(Object.assign({},redisConfig.single,deployConfig.db.redisSingleOption), deployConfig.db.redisSingle),
      mysqlPool: mysqlModule(deployConfig.db.mysql),
      responder: responderModule,
      config: deployConfig.api,
      rsa: deployConfig.rsa,
    };
    services.config = new Proxy(services.config, handler);
    return services;
  }
};

module.exports = deployLoad;