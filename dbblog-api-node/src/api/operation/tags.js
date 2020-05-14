/**
 * Created by dalgurak on Sun May 10 2020
 */

exports.handler = async ctx => {
  const cs = ctx.api.services;
  let conn = await cs.mysqlPool.getConnection();
  let [data] = await conn.query(`SELECT t.name ,sum(t.num) as linkNum FROM (
    SELECT distinct t.type, t.name, (select count(*) from tag_link tl2 
    WHERE tl2.tagId = t.id) as num
    FROM tag t
    LEFT JOIN tag_link tl ON t.id = tl.tagId AND t.type = tl.type) t
  GROUP BY t.name`);
  conn.release();
  ctx.body = cs.responder.success(data || []).json;
};