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

class C_QueryBuilder {
  statement = "";
  from = "";
  where = "";
  limit = "";
  insert = [];
  values = [];
  constructor(props) {
    if (props){
      this.statement = props.statement;
      this.from = props.from;
      this.where = props.where;
      this.limit = props.limit;
      this.values = props.values;
    }
  }

  Execute (cb) {
    let nQuery = `${this.statement} FROM \`${this.from}\``;
    if (this.insert.length > 0) {
      nQuery += ` (${this.insert.map((item) => {
        return `'${item}'`;
      })})`;
      nQuery += ` VALUES(${this.values.map((item) => {
        return `'${item}'`;
      })})`;
    }
    if (this.where) nQuery += ` WHERE ${this.where}`;
    if (this.limit) nQuery += ` LIMIT ${this.limit}`;
    nQuery += ";"
    
    querySQL(nQuery, cb);
  }
}

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

module.exports = {db_conn, querySQL, C_QueryBuilder};