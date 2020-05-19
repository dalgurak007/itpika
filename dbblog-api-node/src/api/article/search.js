/**
 * Created by dalgurak on Sun May 10 2020
 */

exports.handler = async ctx => {
  const cs = ctx.api.services;
  // ctx.query.page = parseInt(ctx.query.page) || 0;
  // ctx.query.limit = parseInt(ctx.query.limit) || 0;
  let conn = await cs.mysqlPool.getConnection();
  // let [data] = await conn.query(`SELECT * FROM article WHERE MATCH(title,description) AGAINST (? IN BOOLEAN MODE)`, 
  let [data] = await conn.query(`SELECT * FROM article WHERE LOCATE(?,title)>0`, 
  [ctx.request.query.keywords]);
  conn.release();
  ctx.body = cs.responder.success(data).json;
};