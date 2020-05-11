/**
 * Created by weiwei on 2018/5/11.
 */

const responder = {
  privateKeys: {},
  setup(ctx) {
    this.ctx = ctx;
    // this.publicKey = ctx.api.services.rsa

  },
  _content: {
    get log() {
      return `code: ${this.code}, message: ${this.message}`
        + (this.data && ` data: ${JSON.stringify(this.data)}`);
    },
    get json() {
      return responder.json.call(this);
    },
    get encryptJson(){
      return responder.encryptJson.call(this);
    }
  },
  encryptJson() {
    return JSON.stringify({ code: this.code, message: this.message, data: this.data });
  },
  json(){
      return JSON.stringify({code: this.code, message: this.message, data: this.data });
  },
  error(code, message, data = null) {
    this._content.code = code || -1;
    this._content.message = message || 'unknown error';
    this._content.data = data || { ok: 0 };
    return this._content;
  },
  success(data, message) {
    this._content.code = 200;
    this._content.message = message || 'success';
    this._content.data = data || { ok: 1 };
    return this._content;
  },
  page(data, total, ctx, message) {
    this._content.code = 200;
    this._content.message = message || 'success';
    let tmp = Math.floor(total / ctx.query.limit);
    this._content.data = {
      list: data,
      totalPage: total % ctx.query.limit === 0 ? tmp : tmp + 1,
      currPage: Math.floor(total / ctx.query.page),
    };
    return this._content;
  }

};

module.exports = responder;