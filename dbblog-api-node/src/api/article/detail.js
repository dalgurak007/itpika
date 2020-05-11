/**
 * Created by dalgurak on Sun May 10 2020
 */

exports.handler = async ctx => {
  const cs = ctx.api.services;
  let conn = await cs.mysqlPool.getConnection();
  let [data] = await conn.query('SELECT * FROM article WHERE id=?', 
  [ctx.query.id]);
  conn.release();
  ctx.body = cs.responder.success(data[0] || {}).json;
};