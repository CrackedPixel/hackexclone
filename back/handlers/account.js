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
  // res.end();

  // Check existing
  let nQuery = "SELECT 1 from `accounts` WHERE `username`='"+username+"' LIMIT 1;";
  DB.querySQL(nQuery, (response) => {

    if (response.code){
      return web_response.send({ code: response.code, title: "error", message: response.error })
    }
    if (response.matches !== 0){ return web_response.send(error_codes.existing_account); }
    // Add new
    let nusalt = Math.floor(Date.now()/1000);

    nQuery = "INSERT INTO `characters` (level) VALUES ('1');"

    DB.querySQL(nQuery, response2 => {
      let charID = response2.data.insertId;
      console.log("InsertID:", charID);
      if (response2.code){ return web_response.send({ code: response2.code, title: "error", message: response2.error }) }
      if (response2.data.affectedRows !== 1){
        return web_response.send(error_codes.db_insert_update);
      }else {

        
        console.log(charID);

        nQuery = "INSERT INTO `accounts` (email, username, password, salt, charid) VALUES(" + 
          "'" + email + "'," +
          "'" + username + "'," +
          "'" + sha1(password+nusalt) + "'," +
          "'" + nusalt + "'," +
          "'" + charID + "'" +
          ");";

        DB.querySQL(nQuery, response3 => {
          if (response3.code){
            return web_response.send({
              code: response3.code,
              title: "error",
              message: response3.error
            })
          }
          if (response3.data.affectedRows !== 1){
            return web_response.send(error_codes.db_insert_update);
          }else {
            return web_response.send(error_codes.created_account);
          }
        })
      }
    })
  });
}

const verify_login = (req, res) => {
  console.log(req.body);
  const {username, password} = req.body;

  let nQuery = "SELECT 1 FROM `accounts` WHERE `username`='" + username + "' LIMIT 1;";
  DB.querySQL(nQuery, response => {
    if (response.code){
      console.log("DB ERROR");
      return web_response.send({
        code: response.code,
        title: "error",
        message: response.error
      })
    }
    console.log("Matches:", response.matches);
    if (response.matches !== 1){
      return res.send(error_codes.invalid_login);
    }else{
      return res.send({
        "validLogin": true,
        "userInfo": {
          "userID": 14,
          "userName": "CrackedPixel",
          "level": 25,
          "cash_hand": 1255
        }
      });
    }
  })
  // res.send(error_codes.invalid_login);
}

module.exports = {verify_login, create_account}