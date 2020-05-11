/**
 * Created by dalgurak on Fri May 08 2020
 */

const mysql = require('mysql2');
 
const bluebird = require('bluebird');

const mysqlPool = {
  async getConnect() {
    return new Promise(res => {
      this.pool.getConnection((err,connection) => {
        if (err) {
          console.log(err);
          res();
          return
        }
        res(connection);
      });
    });
  }
}

module.exports = config => {
  const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
    waitForConnections: true,
    connectionLimit: config.poolSize,
    queueLimit: 0
  });
  return pool.promise();
  // const [rows,fields] = await promisePool.query("SELECT 1");
  // mysqlPool.pool = await mysql.createPool({
    // connectionLimit : config.poolSize,
    // host: config.host,
    // user: config.user,
    // password: config.password,
    // database: config.database
  // });
}