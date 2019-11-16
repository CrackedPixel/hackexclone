'use strict';
const config = require('../config');
const jwt = require('jsonwebtoken');
const HTEC = require('./htec');

const token_validHeader = (req) => {
  let tToken = req.headers.token; //getTokenFromHeader(req.headers.cookie);
  if (!tToken) return {code: HTEC.UNAUTHORIZED_401};
  
  var tempToken = isValidToken(tToken);
  if (tempToken.code !== 0) return {code: tempToken.code};

  return tempToken;
}

const createToken = (nUserInfo) => {
  try {
    let token = jwt.sign({...nUserInfo}, config.jwt_secret, {
        algorithm: 'HS256',
        expiresIn: config.jwt_expires
    });
    return token;
  }catch(error) {
    return {[error]: true, message: error}
  }
}

const isValidToken = (token) => {
  let rtnVal = { code: 0 }
  try {
    rtnVal.payload = jwt.verify(token, config.jwt_secret);
  } catch (e) {
    rtnVal.code = (e instanceof jwt.JsonWebTokenError) ? HTEC.UNAUTHORIZED_401 : HTEC.BADREQUEST_400
  }
  return rtnVal;
}

const getTokenFromHeader = (header_info) => {
  if (header_info === undefined) return "";
  let trim_hi = header_info.trim();
  let testToken = trim_hi.split(';').filter( (word) => {
    if (word.indexOf("token") === 0) return word;
  });
  
  if (testToken.length > 0) return testToken[0].substr(6);
}


const token_refresh = (req, res) => {
  if (req.headers.cookie === undefined) return res.end();
    
  let tToken = getTokenFromHeader(req.headers.cookie);
  if (!tToken) return res.end();

  var tempToken = isValidToken(tToken);
  if (tempToken.code !== 0) return res.end();

  let unix_epoch = Math.round(Number(Date.now()) / 1000);
  if (tempToken.payload.exp - unix_epoch > (config.jwt_expires-10)) return res.end();

  let newToken = createToken(tempToken.payload);
  res.cookie('token', newToken, { maxAge: config.jwt_expires * 1000 })
  res.send(newToken);
  res.end();
}

module.exports = { createToken, token_validHeader, isValidToken, token_refresh }