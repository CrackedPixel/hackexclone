'use strict';
const mysql = require('mysql');

// const db_conn = mysql.createPool({
//   host: "192.168.1.19",
//   user: "reading",
//   password: "rainbow",
//   database: "reading"
// });


const db_conn = mysql.createPool({
  host: "192.168.1.19",
  user: "hackexcloner",
  password: "appgame",
  database: "hackex"
});

const querySQL = (req, cb) => {
  let res = {};
  console.log("SQL", req);
  db_conn.getConnection( (err, conn) => {
    if (err) {
      console.error("DB-ERR:", err);
      return cb({
        code: 1,
        error: err.message
      });
    }
    db_conn.query(req, (erro, result, fields) => {
      conn.release();
      if (erro) {
        return cb({
          code: 1,
          error: erro.message
        });
      }
      res.matches = result.length;
      res.data = result;
      res.fields = fields;
      cb(res);
    });
  })
  
}

module.exports = {db_conn, querySQL};