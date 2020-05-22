/**
 * Created by dalgurak on Sun May 10 2020
 */

exports.handler = async ctx => {
  const cs = ctx.api.services;
  let conn = await cs.mysqlPool.getConnection();
  // let [data] = await conn.query('SELECT * FROM recommend ORDER BY top DESC,id DESC  LIMIT 5');
  let [data] = await conn.query(`SELECT *  FROM (
    SELECT a.id as linkId,a.title,'article' as type,a.readNum,a.createTime as createTime from article a
    WHERE a.recommend=1
    UNION ALL
    SELECT bn.id as linkId ,bn.title,'bookNote' as type,bn.readNum,bn.createTime as createTime FROM book_note bn
    WHERE bn.recommend=1) t
    ORDER BY t.createTime DESC LIMIT 5`);
  conn.release();
  ctx.body = cs.responder.success(data || []).json;
};