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
  let nQuery = "SELECT 1 from `accounts` WHERE LOWER(`username`)='"+username.toLowerCase()+"' LIMIT 1;";
  DB.querySQL(nQuery, (response) => {

    if (response.code){
      return web_response.send({ code: response.code, title: "error", message: response.error })
    }
    if (response.matches !== 0){ return web_response.send(error_codes.existing_account); }

    nQuery = "SELECT 1 from `accounts` WHERE LOWER(`email`)='"+email.toLowerCase()+"' LIMIT 1;";
    DB.querySQL(nQuery, (responser) => {
      if (responser.code){
        return web_response.send({ code: responser.code, title: "error", message: responser.error })
      }
      if (responser.matches !== 0){ return web_response.send(error_codes.existing_email); }

      let nusalt = Math.floor(Date.now()/1000);

      nQuery = "INSERT INTO `characters` (name) VALUES ('"+username+"');"

      DB.querySQL(nQuery, response2 => {
        let charID = response2.data.insertId;
        console.log("InsertID:", charID);
        if (response2.code){ return web_response.send({ code: response2.code, title: "error", message: response2.error }) }
        if (response2.data.affectedRows !== 1){
          return web_response.send(error_codes.db_insert_update);
        }else {
          nQuery = "INSERT INTO `accounts` (email, username, password, salt, charid) VALUES(" + 
            "'" + email.toLowerCase() + "'," +
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
    })    
  });
}

const verify_login = (req, res) => {
  console.log(req.body);
  const {username, password} = req.body;

  let nQuery = "SELECT `salt` FROM `accounts` WHERE LOWER(`username`)='" + username.toLowerCase() + "' LIMIT 1;";
  DB.querySQL(nQuery, response => {
    if (response.code){ return res.send({ code: response.code, title: "error", message: response.error }) }
    if (response.matches !== 1){ return res.send(error_codes.invalid_login); }
    else{
      let temp_salted = sha1(password+response.data[0].salt);
      nQuery = "SELECT `index`, `username`, `charid` FROM `accounts` WHERE LOWER(`username`)='" + username.toLowerCase() + "' AND `password`='"+temp_salted+"' LIMIT 1;";
      DB.querySQL(nQuery, response2 => {
        if (response2.code){ return res.send({ code: response2.code, title: "error", message: response2.error }) }
        if (response2.matches !== 1){ return res.send(error_codes.invalid_login); }
        else{
          nQuery = "SELECT `level`, `cash_hand`, `cash_bank` FROM `characters` WHERE `index`='" + response2.data[0].charid + "' LIMIT 1;";
          DB.querySQL(nQuery, response3 => {
            if (response3.code){ return res.send({ code: response3.code, title: "error", message: response3.error }) }
            if (response3.matches !== 1){ return res.send(error_codes.invalid_login); }
            else{
              return res.send({
                "validLogin": true,
                "userInfo": {
                  "userID": response2.data[0].index,
                  "userName": response2.data[0].username,
                  "level": response3.data[0].level,
                  "cash_hand": response3.data[0].cash_hand,
                  "cash_bank": response3.data[0].cash_bank
                }
              });
            }
          })
        }
      })
      
    }
  })
  // res.send(error_codes.invalid_login);
}

module.exports = {verify_login, create_account}