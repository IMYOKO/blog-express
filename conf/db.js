// 获取环境变量
const env = process.env.NODE_ENV

// 配置
let MYSQL_CONFING
let REDIS_CONFING

if (env === 'development') {
  MYSQL_CONFING = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'yoko.wang190123',
    database: 'myblog'
  }
  REDIS_CONFING = {
    host: '127.0.0.1',
    port: 6379
  }
}

if (env === 'production') {
  MYSQL_CONFING = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'yoko.wang190123',
    database: 'myblog'
  }
  REDIS_CONFING = {
    host: '127.0.0.1',
    port: 6379
  }
}

module.exports = {
  MYSQL_CONFING,
  REDIS_CONFING
}