/**
 * Created by weiwei on 2018/5/26.
 */

const validations = {
  setup(config) {
    this.config = config.config || this.config;
    this.data = config.postData || {};
    return this;
  },
  validate() {
    const config = this.config;
    for (let field in config) {
      if (!config.hasOwnProperty(field)) {
        continue;
      }

      const fieldConfig = config[field];
      for (let rule of fieldConfig.rules) {
        const isValid = this.getMethod(rule, field);

        if (!isValid) {
          return this.getMessage(rule, field);
        }
      }
    }
  },
  getMethod(rule, field) {
    if (typeof rule === 'string' && rule.length > 0 && typeof this.methods[rule] === 'function') {
      return this.methods[rule].call(this, field);
    } else if (rule instanceof Array && [2, 3].indexOf(rule.length) > -1 && typeof this.methods[rule[0]] === 'function') {
      return this.methods[rule[0]].call(this, field, rule[1], rule[rule.length - 1] === 'optional');
    } else {
      throw new Error('validations.getMethod error: ' + rule);
    }
  },
  getMessage(mixRule, field) {
    let rule, params;
    if (mixRule instanceof Array && [2, 3].indexOf(mixRule.length) > -1) {
      rule = mixRule[0];
      params = mixRule[1];
      if (!(params instanceof Array)) {
        params = [params];
      }
    } else {
      rule = mixRule;
    }

    let message = this.config[field].messages[rule];
    if (typeof message === 'function') {
      message = message.call(this, field, params);

    }

    if (typeof message !== 'string') {
      throw new Error('validations.getMessage error: invalid message');
    }

    message = message.replace('{field}', field);

    if (params instanceof Array && params.length > 0) {
      params.forEach((param, i) => {
        message = message.replace(`{${i}}`, params[i]);
      });
    }

    if (message.indexOf('{everyone}') && params instanceof Array) {
      message = message.replace('{everyone}', params.join(','));
    }

    return message;
  },
  methods: {
    required(field) {
      return typeof this.data[field] !== 'undefined' && this.data[field] !== '' && this.data[field] !== null;
    },
    noEmptyObject(field) {
      return typeof this.data[field] !== 'undefined' && this.data[field] !== '' && this.data[field] !== null && Reflect.ownKeys(this.data[field]).length > 0;
    },
    regex(field, re, isOptional = false) {
      if (!(re instanceof RegExp)) {
        throw new Error('validations.methods.regex error: params of regex function must be an instance of RegExp');
      }

      const value = this.data[field];
      if (isOptional && (value === '' || value === null || value === undefined)) {
        return true;
      }

      return re.test(value);
    },
    len(field, params, isOptional = false) {
      const value = this.data[field];

      // 判断可选条件的值
      if (isOptional && ['', undefined].indexOf(value) > -1) {
        this.data[field] = '';
        return true;
      }

      if (typeof params === 'number') {
        return value.length === params;
      } else if (params instanceof Array && params.length === 2) {
        return value.length >= params[0] && value.length <= params[1];
      } else {
        throw new Error('validations.methods.len error');
      }
    },
    in(field, params, isOptional = false) {
      const value = this.data[field];

      // if (isOptional && ['', '0'].indexOf(value) > -1) {
      //   this.data[field] = '';
      //   return true;
      // }
      if (isOptional) {// 可选
        return (value === undefined || value === null) || params.indexOf(value) > -1;
      } else {// 必须
        return params.indexOf(value) > -1;
      }
    }
  },
  validatePhone(phone) {
    if (!(/^1[0-9]{10}$/.test(phone))) {
      return false;
    }
    return true;
  },
};

module.exports = validations;