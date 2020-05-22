/**
 * Created by dalgurak on Sun May 10 2020
 */

exports.handler = async ctx => {
  const cs = ctx.api.services;
  ctx.query.page = parseInt(ctx.query.page) || 0;
  ctx.query.limit = parseInt(ctx.query.limit) || 0;
  let conn = await cs.mysqlPool.getConnection();
  
  
  let [data] = await conn.query(`SELECT id,title,description,createTime FROM article WHERE	publish = 1
  UNION
  SELECT id,title,description,createTime FROM book_note WHERE	publish = 1`);
  conn.release();
  let ret = {};
  let tmp;
  for (let i = 0; i < data.length; i++) {
    tmp = new Date(data[i].createTime).getFullYear();
    if (ret[tmp]) {
      ret[tmp] += 1;
    } else {
      ret[tmp] = 1;
    }
  }
  tmp = []
  for (let k in ret) {
    tmp.push({year: k, count: ret[k]});
  }
  tmp.sort((a,b) => {
    return b.year - a.year;
  });
  ctx.body = cs.responder.success(tmp).json;
};