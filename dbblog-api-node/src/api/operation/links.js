/**
 * Created by dalgurak on Sun May 10 2020
 */

exports.handler = async ctx => {
  const cs = ctx.api.services;
  let conn = await cs.mysqlPool.getConnection();
  let [data] = await conn.query(`SELECT title,url,avatar FROM link`);
  conn.release();
  ctx.body = cs.responder.success(data || []).json;
};