'use strict';
const mysql = require('mysql');

// const db_conn = mysql.createPool({
//   host: "192.168.1.19",
//   user: "reading",
//   password: "rainbow",
//   database: "reading"
// });


const db_conn = mysql.createPool({
  host: "sql9.freemysqlhosting.net",
  user: "sql9309836",
  password: "QrAfCdC9xl",
  database: "sql9309836"
});

const querySQL = (req, cb) => {
  let res = {};
  console.log("SQL", req);
  db_conn.getConnection( (err, conn) => {
    if (err) {
      return res.send({
        code: 1,
        error: err.message
      }).end();
    }
    db_conn.query(req, (erro, result, fields) => {
      conn.release();
      if (erro) {
        return res.send({
          code: 1,
          error: erro.message
        }).end();
      }
      res.matches = result.length;
      res.data = result;
      res.fields = fields;
      cb(res);
    });
  })
  
}

module.exports = {db_conn, querySQL};