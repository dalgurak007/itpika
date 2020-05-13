/**
 * Created by dalgurak on Sun May 10 2020
 */

exports.handler = async ctx => {
  const cs = ctx.api.services;
  ctx.query.page = parseInt(ctx.query.page) || 0;
  ctx.query.limit = parseInt(ctx.query.limit) || 0;
  let conn = await cs.mysqlPool.getConnection();
  
  // 推荐
  let where = '';
  if (ctx.query.recommend) where += "WHERE recommend=1 "

  // order 排序
  let order = 'ORDER BY ';
  if (ctx.query.favorite) order += 'likeNum DESC,';
  if (order[order.length-1] !== ',') order += 'createTime DESC,';
  
  let [data] = await conn.query(`SELECT * FROM article ${where} ${order.substring(0,order.length-1)} LIMIT ?,?`, 
  [(ctx.query.page-1) * ctx.query.limit, ctx.query.limit]);
  let [ret] = await conn.query('SELECT COUNT(id) AS total FROM article');
  conn.release();
  ctx.body = cs.responder.page(data, ret[0].total, ctx).json;
};