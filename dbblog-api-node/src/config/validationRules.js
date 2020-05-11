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
  '/user/register/personal': {
    nickName: common.onlyRequired,
    password: common.password,
    phoneNumber:common.phoneNumber,
    idCardNum:common.onlyRequired,
    realName:common.onlyRequired,
    SMSCode:common.onlyRequired,
  },
  '/user/register/leagl': {
    nickName: common.onlyRequired,
    password: common.onlyRequired,
    phoneNumber:common.phoneNumber,
    SMSCode:common.onlyRequired,
    idNumber:common.onlyRequired,
    realName:common.onlyRequired,
    legalType: common.onlyRequired,
    provider: common.onlyRequired,
    setupCode: common.onlyRequired,
  },
  '/thirdparty/interface/save': {
    organization: common.onlyRequired,
    url: common.onlyRequired,
    method: common.onlyRequired,
    alias: common.onlyRequired,
  },
  '/thirdparty/exitAndEntry': {
    alias: common.onlyRequired,
    hasThirdUserId: common.optionalBoolean,
    userToken: common.userToken,
  },
  '/thirdparty/whz': {
    alias: common.onlyRequired,
    userToken: common.userToken,
  },
  '/thirdparty/whz/html': {
    Alias: common.onlyRequired,
    userToken: common.userToken,
  },
  '/thirdparty/scga': {
    alias: common.onlyRequired,
    userToken: common.userToken,
  },
  '/thirdparty/scga/direct': {
    alias: common.onlyRequired,
  },
  '/thirdparty/founded': {
    alias: common.onlyRequired,
    userToken: common.userToken,
    isFileRequest: common.optionalBoolean,
    hasFoundedUserToken: common.onlyRequired,
  },
  '/thirdparty/founded/login': {
    userToken: common.userToken,
  },
  '/thirdparty/founded/convenienceServices': {
    userToken: common.userToken,
  },
  '/security/getSmsCode': {
    phoneNumber: common.phoneNumber,
  },
  '/user/smsCodeLogin': {
    code: common.smsCode,
    phone: common.phoneNumber,
    accountType: common.accountType,
  },
  '/user/smsCodeLogin': {
    code: common.smsCode,
    phone: common.phoneNumber,
  },
  '/security/msg/sendTemplate': {
    phone: common.phoneNumber,
    template: common.onlyRequired,
    params: common.onlyRequired,
  },
  '/user/delete': {
    id: common.onlyRequired,
  },
  '/user/info': {
    userToken: common.userToken,
  },
  '/user/update': {
    userToken: common.userToken,
    field: common.onlyRequired,
    value: common.onlyRequired,
  },
  '/user/save': {
    name: common.onlyRequired,
    pwd: common.onlyRequired,
    phone: common.onlyRequired,
    realName: common.onlyRequired,
  },
  '/user/sendMessage': {
    phone: common.onlyRequired,
    type: common.onlyRequired,
  },
  '/card/findOne': {
    id: common.onlyRequired,
  },
  '/card/save': {
    cardType: common.onlyRequired,
    contants: common.noEmptyObj,
    userToken: common.userToken,
  },
  '/card/idCard': {
    contants: common.noEmptyObj,
    userId: common.ObjectId,
  },
  '/card/edit': {
    cardId: common.ObjectId,
    cardType: common.onlyRequired,
    contants: common.noEmptyObj,
    userToken: common.userToken,
  },
  '/card/detail': {
    id: common.ObjectId
  },
  '/user/logout': {
    userToken: common.userToken,
  },
  '/thirdparty/register': {
    userToken: common.userToken,
  },
  '/security/token_validate': {
    userToken: common.userToken,
  },
  '/upload/upload': {
    userToken: common.userToken,
  },
  '/user/feedback/feedback': {
    userToken: common.userToken,
    type:common.onlyRequired,
    category:common.onlyRequired
  },
  '/user/feedback/getType': {
    userToken: common.userToken,
  },
  '/user/homepage/message/page': {
    userToken: common.userToken,
  },
  '/user/homepage/message/del': {
    msgId: common.ObjectId
  },
  '/user/homepage/message/read': {
    msgId: common.ObjectId
  },
  '/express/emx/expressStatus': {
    mailNo: common.onlyRequired,
    userToken: common.userToken,
  },
  '/express/ems/mail/stateFeedback': {
    method: common.onlyRequired,
    txLogisticID: common.onlyRequired,
    sign: common.onlyRequired,
  },
  '/base/file/foundedFileDown': {
    userToken: common.userToken,
    fileId: common.onlyRequired,
  },
  '/security/authentication/getRealPeopleCertificationInfo': {
    phoneNumber: common.phoneNumber,
  },
  '/user/faceLogin': {
    validateParam: common.onlyRequired,
    accountType: common.onlyRequired,
    username: common.onlyRequired,
    IdNumber: common.onlyRequired,
  },
};
module.exports = validationRules;