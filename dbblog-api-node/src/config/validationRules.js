/**
 * Created by weiwei on 2018/5/26.
 */

const common = {
  optionalBoolean: {
    rules: [
      ['in', [true,false],'optional']
      // ['in', ["1","0"]]
    ],
    messages: {
      in: '{field} must be in {everyone}',
    }
  },
  onlyBoolean: {
    rules: [
      ['in', [true,false]]
      // ['in', ["1","0"]]
    ],
    messages: {
      in: '{field} must be in {everyone}',
    }
  },
  ObjectId: {
    rules: [
      'required',
      ['len', 24]
    ],
    messages: {
      required: '{field} can not be empty',
      len: '{field} length must be {0} as an ObjectId length',
    }
  },
  smsCode: {
    rules: [
      'required',
      ['len', 6]
    ],
    messages: {
      required: '{field} can not be empty',
      len: '{field} length must be {0} as an ObjectId length',
    }
  },
  noEmptyObj: {
    rules: [
      'required',
      'noEmptyObject'
    ],
    messages: {
      required: '{field} can not be empty',
      noEmptyObject: '{field} cannot be an empty object',
    }
  },

  phoneNumber: {
    rules: [
      'required',
      ['len', 11]
    ],
    messages: {
      required: '{field} can not be empty',
      len: '{field} length must be {0}',
    }
  },
  optionalDateTime: {
    rules: [
      ['regex', /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, 'optional']
    ],
    messages: {
      regex: '{field} format must be date time as `YYYY-mm-dd HH:MM:SS`'
    }
  },
  optionalInteger: {
    rules: [
      ['regex', /^\d+$/, 'optional']
    ],
    messages: {
      regex: '{field} format must be integer'
    }
  },
  optionalShortDate: {
    rules: [
      ['regex', /^\d{8}$/, 'optional']
    ],
    messages: {
      regex: '{field} format must be date as `YYYYmmdd`'
    }
  },
  password: {
    rules: [
      'required',
      ['len', [6,20]]
    ],
    messages: {
      required: '{field} can not be empty',
      len: 'The {field} length is between {0} and {1}',
    }
  },
  ObjectId: {
    rules: [
      'required',
      ['len', 24]
    ],
    messages: {
      required: '{field} can not be empty',
      len: '{field} length must be {0} as an ObjectId length',
    }
  },
  userToken: {
    rules: [
      'required',
      ['len', 32]
    ],
    messages: {
      required: '{field} can not be empty',
      len: '{field} length must be {0}',
    }
  },
  onlyRequired: {
    rules: [
      'required',
    ],
    messages: {
      required: '{field} can not be empty and null',
    }
  },
  accountType: {
    rules: [
      'required',
      ['in', [1,0]]
    ],
    messages: {
      required: '{field} can not be empty and null',
      in: '{field} must be in {everyone}',
    }
  },
  get appid() {
    return this.ObjectId;
  },
  get agentId() {
    return this.ObjectId;
  },
  get orderId() {
    return this.ObjectId;
  },
  token: {
    rules: [
      'required'
    ],
    messages: {
      required: '{field} can not be empty',
    }
  }
};

const validationRules = {
  '/user/login': {
    username: common.onlyRequired,
    logintype: common.onlyRequired,
    password: common.onlyRequired,
    accountType: common.accountType,
  },
  '/article/search': {
    keywords: common.onlyRequired,
  },
};
module.exports = validationRules;