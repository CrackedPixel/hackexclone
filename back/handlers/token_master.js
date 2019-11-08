'use strict';
const config = require('../config');
const jwt = require('jsonwebtoken');
const HTEC = require('./htec');

const token_validHeader = (req) => {
  let tToken = getTokenFromHeader(req.headers.cookie);
  if (!tToken){
      return {code: HTEC.UNAUTHORIZED_401};
  }

  var tempToken = isValidToken(tToken);
  if (tempToken.code !== 0){
      return {code: tempToken.code};
  }

  return tempToken;
}

const createToken = (nUserInfo) => {
  let token = jwt.sign({
          "uname": nUserInfo.uname,
          "access": nUserInfo.access_level,
          "self_org": nUserInfo.self_org,
          "self_id": nUserInfo.self_id
  }, config.jwt_secret, {
      algorithm: 'HS256',
      expiresIn: config.jwt_expires
  });

  return token;
}

const isValidToken = (token) => {
  let rtnVal = {
    code: 0
  }
  try {
      rtnVal.payload = jwt.verify(token, config.jwt_secret);
  } catch (e) {
      if (e instanceof jwt.JsonWebTokenError){
          rtnVal.code = HTEC.UNAUTHORIZED_401;
      }
      
      rtnVal.code = HTEC.BADREQUEST_400;
  }
  return rtnVal;
}

const getTokenFromHeader = (header_info) => {
  if (header_info === undefined) return "";
  let trim_hi = header_info.trim();
  let testToken = trim_hi.split(';').filter( (word) => {
    if (word.indexOf("token") === 0){
      return word;
    }
  });
  
  if (testToken.length > 0){
    return testToken[0].substr(6);
  }
}


const token_refresh = (req, res) => {
  if (req.headers.cookie === undefined) {
    //res.status(HTEC.BADREQUEST_400).end();
    res.end();
    return;
  }
  let tToken = getTokenFromHeader(req.headers.cookie);
  if (!tToken){
    //res.status(HTEC.UNAUTHORIZED_401).end();
    res.end();
    return;
  }

  var tempToken = isValidToken(tToken);
  if (tempToken.code !== 0){
      //res.status(tempToken.code).end();
      res.end();
      return;
  }

  let unix_epoch = Math.round(Number(Date.now()) / 1000);
  if (tempToken.payload.exp - unix_epoch > (config.jwt_expires-10)){
    //res.status(HTEC.BADREQUEST_400).end();
    res.end();
    return;
  }

  let newToken = createToken({
    uname: tempToken.payload.uname,
    access: tempToken.payload.access,
    self_org: tempToken.payload.self_org,
    self_id: tempToken.payload.self_id
  });
  res.cookie('token', newToken, { maxAge: config.jwt_expires * 1000 })
  res.send(newToken);
  res.end();
}

module.exports = { createToken, token_validHeader, isValidToken, token_refresh }