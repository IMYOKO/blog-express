const REDIS = require('redis')
const { REDIS_CONFING } = require('../conf/db')

// 创建客户端
const REDIS_CLIENT = REDIS.createClient(REDIS_CONFING.port, REDIS_CONFING.host)
REDIS_CLIENT.on('error', err => {
  console.error(err)
})

module.exports = REDIS_CLIENT