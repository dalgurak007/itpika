/**
 *  Created by dalgurak on Tue Nov 06 2018 16:4:24
 */
const validationRules = require('../config/validationRules');
const validations = require('../modules/validation');
module.exports = () => {
  return async (ctx, next) => {
    const uri = ctx.api.uri;
    let params = Object.assign({},ctx.request.body,ctx.query);
    if (validationRules.hasOwnProperty(uri)) {
      const message = validations.setup({
        config: validationRules[uri],
        postData: params,
      }).validate();
      if (message) {
        ctx.state = 2001;
        return ctx.body = ctx.api.services.responder.error(3003,message).json;
      }
    }
    await next();
  };
};