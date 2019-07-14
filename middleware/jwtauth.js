const jwt = require('jwt-simple');
const jwtSecret = require('../conf/jwtConf')
const { getUser } = require('../controller/user')
const { ErrorModel } = require('../model/resModel')

module.exports = function(req, res, next) {
  //todo
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token']
  console.log('token: ', token)
  if (token) {
    try {
      var decoded = jwt.decode(token, jwtSecret);
      //todo  handle token here
      console.log('decoded: ', decoded)
      if( decoded.exp <= Date.now()) {
        res.json(new ErrorModel('token过期'))
      }
      req.iss = decoded.iss;
      getUser(req.iss.id).then(data => {
        if (data.id) {
          next()
        } else {
          res.json(new ErrorModel('token无效'))
        }
      })
    } catch (err) {
      return next()
    }
  } else {
    next()
  }
}