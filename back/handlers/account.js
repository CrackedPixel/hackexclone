'use strict';
const config = require('../config');
const jwt = require('jsonwebtoken');
const HTEC = require('./htec');
const token_master = require('./token_master');
const error_codes = require('../errorCodes');
const DB = require('./db');


const create_account = (req, res) => {
  console.log(req.body);
  res.end();
  // let validToken = token_master.token_validHeader(req);
  // if (validToken.code !== 0){
  //     return res.status(validToken.code).send({
  //       code: error_codes.not_logged_in,
  //       error: error_codes.labels.not_logged_in
  //     }).end();
  // }
  
  // if (validToken.payload.access < config.access.administrator){
  //   return res.status(validToken.code).send({
  //     code: error_codes.no_access,
  //     error: error_codes.labels.no_access
  //   }).end();
  // }

  // let {nuname, nupass, nuaccess, nuorg} = req.body;
  // if (!nuname || !nupass || !nuaccess || !nuorg){
  //   return res.send({
  //     code: error_codes.missing_data,
  //     error: error_codes.labels.missing_data
  //   }).end();
  // }

  // // Check existing
  // let nQuery = "SELECT 1 from `organizations_auth` WHERE `username`='"+nuname+"' LIMIT 1;";
  // DB.querySQL(nQuery, (response) => {
  //   if (response.matches !== 0){
  //     return res.send({
  //       code: error_codes.existing_user_student,
  //       error: error_codes.labels.existing_user_student
  //     }).end();
  //   }
  //   // Add new
  //   let nusalt = Math.floor(Date.now()/1000);
    
  //   nQuery = "INSERT INTO `organizations_auth` (organization_id, access_level, username, password, salt) VALUES(" + 
  //   "'" + nuorg + "'," +
  //   "'" + nuaccess + "'," +
  //   "'" + nuname + "'," +
  //   "'" + sha1(nupass+nusalt) + "'," +
  //   "'" + nusalt + "'" +
  //   ");";

  //   // DB.querySQL(nQuery, (response) => {
  //   //   if (response.data.affectedRows !== 1){
  //   //     res.send({code: error_codes.db_insert_update, error: error_codes.labels.db_insert_update});
  //   //   }else{
  //   //     res.send({code: error_codes.none, success: true});
  //   //   }
  //   //   res.end();
  //   // });
  // });
}

const verify_login = (req, res) => {

}

module.exports = {verify_login, create_account}