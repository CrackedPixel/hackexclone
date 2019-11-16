'use strict';
const token_master = require('./token_master');

const scan_scan_random = (req, res) => {
  const {scanip } = req.body;
  if (!scanip) return res.end();
  if (!scanip.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)/)) return res.end();

  console.log(req.body);
  res.end();
}

module.exports = {scan_scan_random}