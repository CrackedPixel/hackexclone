'use strict';
const config = require('../config');
const jwt = require('jsonwebtoken');
const HTEC = require('./htec');
const sha1 = require('js-sha1');
const token_master = require('./token_master');
const error_codes = require('../errorCodes');
const DB = require('./db');


const create_account = (req, web_response) => {
  const {email, username, password } = req.body;
  console.log(req.body);

  let Q1 = new DB.C_QueryBuilder({
    statement: "SELECT 1",
    from: "accounts",
    where: `LOWER(\`username\`)='${username.toLowerCase()}' OR LOWER(\`email\`)='${email.toLowerCase()}'`, 
    limit: "1"
  })
  let Q2 = new DB.C_QueryBuilder({
    statement: "INSERT INTO `characters`",
    insert: ['charName'],
    values: [username]
  })
  let Q3 = new DB.C_QueryBuilder({
    statement: "UPDATE `addresses`",
    set: ['charID'],
    where: "`charid` is null",
    limit: '1'
  })
  let Q4 = new DB.C_QueryBuilder({
    statement: "INSERT INTO `accounts`",
    insert: ['email', 'username', 'password', 'salt', 'charid']
  })
  Q1.Execute(Q1R => {
    if (Q1R.code) return web_response.send({ code: Q1R.code, title: "error", message: Q1R.error }) 
    if (Q1R.matches !== 0) return web_response.send(error_codes.existing_account); 

    let nusalt = Math.floor(Date.now()/1000);

    Q2.Execute(Q2R => {
      if (Q2R.code) return web_response.send({ code: Q2R.code, title: "error", message: Q2R.error })
      if (Q2R.data.affectedRows !== 1) return web_response.send(error_codes.db_insert_update);

      let charID = Q2R.data.insertId;
      Q3.values = [charID];
      Q4.values = [email.toLowerCase(), username.toLowerCase(), sha1(password+nusalt), nusalt, charID];

      Q3.Execute(Q3R => {
        if (Q3R.code) return web_response.send({ code: Q3R.code, title: "error", message: Q3R.error });
        if (Q3R.data.affectedRows !== 1) return web_response.send(error_codes.db_insert_update);

        Q4.Execute(Q4R => {
          if (Q4R.code) return web_response.send({ code: Q4R.code, title: "error", message: Q4R.error });
          if (Q4R.data.affectedRows !== 1) return web_response.send(error_codes.db_insert_update);
          return web_response.send(error_codes.created_account);
        })
      })
    })
  })
}

const verify_login = (req, res) => {
  console.log(req.body);
  const {username, password} = req.body;

  let Q1 = new DB.C_QueryBuilder({
    statement: "SELECT `index`, `salt`, `charid`",
    from: "accounts",
    where: "LOWER(`username`)='" + username.toLowerCase() + "'",
    limit: "1"
  });
  let Q2 = new DB.C_QueryBuilder({
    statement: "SELECT accounts.charid,`charName`, `level`, `cash_hand`, `cash_bank`, `ipaddress`",
    join: "INNER JOIN `characters` ON accounts.charid=characters.index INNER JOIN `addresses` ON accounts.charid=addresses.charid",
    from: "accounts",
    limit: "1"
  });

  Q1.Execute(Q1R => {
    if (Q1R.code) return res.send({code: Q1R.code, title: "error", message: Q1R.error });
    if (Q1R.matches !== 1) return res.send(error_codes.invalid_login);
    Q2.where = `accounts.index='${Q1R.data[0].index}\' AND \`password\`='${sha1(password+Q1R.data[0].salt)}'`;
    Q2.Execute(Q2R => {
      if (Q2R.code) return res.send({code: Q2R.code, title: "error", message: Q2R.error });
      if (Q2R.matches !== 1) return res.send(error_codes.invalid_login);
        return res.send({
          "validLogin": true,
          "userInfo": Q2R.data[0],
          "token": token_master.createToken(Q2R.data[0]);
        }); // - return
     }) // Q2
  }); // Q1
}


module.exports = {verify_login, create_account}