'use strict';
const token_master = require('./token_master');
const error_codes = require('../errorCodes');
const DB = require('./db');

const scan_scan_random = (req, res) => {
  // const validToken = token_master.token_validHeader(req);
  // if (validToken.code !== 0) return res.status(validToken.code).send(error_codes.not_logged_in);

  const { scanip } = req.body;
  const Q1 = new DB.C_QueryBuilder({
    statement: "SELECT addresses.index, `ipaddress`, `charid`",
    from: 'addresses',
    where: '`charid` IS NOT NULL',
    sort: "RAND()",
    limit: 5
  })

  if (scanip) {
    if (scanip.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)/)) {
      Q1.where = `\`ipaddress\`='${scanip}' AND \`charid\` IS NOT NULL`;
      Q1.limit = 1;
      Q1.sort = '';
    }
  }

  const Q2 = new DB.C_QueryBuilder({
    statement: "SELECT `index`, `charName`",
    from: 'characters',
  })

  Q1.Execute(Q1R => {
    // console.table(Q1R.data);
    let nRes = Q1R.data;
    let builder = Q1R.data.map((item, i) => {
      return `'${item.charid}'`;
    }).join(' OR ');
    Q2.where = `\`index\`=${builder}`
    Q2.Execute(Q2R => {
      Q2R.data.map((item, i) => {
        nRes.forEach(nMap => {
          if (nMap.charid === item.index){
            nMap.charName = item.charName;
          }
        })
      })
      res.send(nRes);
    })
  })
}

module.exports = { scan_scan_random }