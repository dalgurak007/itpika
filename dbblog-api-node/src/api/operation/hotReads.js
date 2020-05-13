/**
 * Created by dalgurak on Sun May 10 2020
 */

exports.handler = async ctx => {
  const cs = ctx.api.services;
  let conn = await cs.mysqlPool.getConnection();
  let [data] = await conn.query(`SELECT *  FROM (
    SELECT a.id as linkId,a.title,0 as type,a.readNum,a.createTime as createTime from article a
    UNION ALL
    SELECT bn.id as linkId ,bn.title,2 as type,bn.readNum,bn.createTime as createTime FROM book_note bn) t
     ORDER BY t.readNum DESC LIMIT 5`);
  conn.release();
  ctx.body = cs.responder.success(data || []).json;
};