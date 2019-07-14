const express = require('express');
var jwt = require('jwt-simple');
const router = express.Router();
const { userlogin, userList, getUser, addUser, updateUser } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const jwtSecret = require('../conf/jwtConf')

router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  const result = userlogin(username, password)
  return result.then(val => {
    if (val.username) {
      // 设置 session 的值
      // req.session.username = val.username
      // req.session.realname = val.realname

      const tokenExpiresTime = 7 * 24 * 60 * 60 * 1000;
      const payload = val
      const token = jwt.encode({
        iss: payload,
        exp: Date.now() + tokenExpiresTime,
      }, jwtSecret)

      val.token = token

      res.json(new SuccessModel(val, '登录成功'))
      return
    } else {
      res.json(new ErrorModel('登录失败'))
    }
  })
});

// 退出登录
router.post('/logout', (req, res, next) => {
  return Promise.resolve(
    res.json(new SuccessModel(true, '退出登录成功'))
  )
});

// 新增用户
router.post('/new', (req, res, next) => {
  const { username, password, realname } = req.body
  const result = addUser(username, password, realname)
  return result.then(data => {
    if (data.id > 0) {
      res.json(new SuccessModel(data))
    } else {
      res.json(new ErrorModel('用户名已存在！'))
    }
  })
});

module.exports = router;
