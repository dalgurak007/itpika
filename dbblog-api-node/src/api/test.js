/**
 *  Created by dalgurak on Mon Apr 15 2019 10:49:34
 * 获取服务器信息
 */
exports.handler = async ctx => {
  const cs = ctx.api.services;
  const r = cs.responder;
  let conn = await cs.mysqlPool.getConnection();
  let row = await conn.query('select * from book');
  conn.release();
  ctx.body = r.success('success').json;
};