const crypto = require('crypto')

// 密匙
const SECRET = 'SHJBKGisa_8987%'

// md5 加密
const MD5 = content => {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

// 加密函数
const genPassword = password => {
  const str = `password=${password}&key=${SECRET}`
  return MD5(str)
}

module.exports = {
  genPassword
}