require('dotenv').config();
const jwt = require('jsonwebtoken');
const env = require("../../config/env");
const OPTIONS = {
  'expiresIn': '300000'
}
module.exports = {
  sign: (data) => jwt.sign(data, env.key.SECRET),
  verify: (req, res, next) => {
    const token = req.header('access_token')
    if (!token) return next()
    const verified = jwt.verify(token, env.key.SECRET)
    if (!verified) return next()
    req.contractNumber = 1
    req.ID = verified.id
    return next()
  }
};
