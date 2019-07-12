const { EXEC, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

/**
 * 登录
 * @param {String} username 
 * @param {String} password 
 */
const userlogin = (username, password) => {
  username = escape(username)

  // 生成加密密码
  password = genPassword(password)
  // console.log(password)
  password = escape(password)
  let sql = `select id, username, realname from users where username = ${username} and password = ${password};`
  // console.log(sql)
  return EXEC(sql).then(rows => {
    return rows[0] || {}
  })
}

/**
 * 查询用户列表
 * @returns {Promise}
 */
const userList = () => {
  let sql = `select id, username, realname from users;`
  return EXEC(sql)
}

/**
 * 根据 id 查询用户
 * @param {Number} id 
 * @returns {Promise}
 */
const getUser = id => {
  let sql = `select id, username, realname from users where id = '${id}';`
  return EXEC(sql).then(rows => {
    return rows[0]
  })
}

/**
 * 新增用户
 * @param {String} username 
 * @param {String} password 
 * @param {String} realname 
 * @returns {Promise}
 */
const addUser = (username, password, realname) => {
  let userSql = `select id from users where username = '${username}';`
  return EXEC(userSql).then(rows => {
    if (rows[0].id) {
      return { id: -1 }
    } else {
      let sql = `insert into users (username, password, realname) values (${escape(username)}, ${escape(genPassword(password))}, ${escape(realname)});`
      return EXEC(sql).then(data => {
        return {
          id: data.insertId
        }
      })
    }
  })
}

/**
 * 修改用户
 * @param {Number} id 
 * @param {Object} option 
 * @returns {Promise}
 */
const updateUser = (id, option = {}) => {
  let sql = `update users set `
  const arr = Object.keys(option)
  arr.map((item, index) => {
    if (index === arr.length -1) {
      sql += `${item}='${option[item]}' ` 
    } else {
      sql += `${item}='${option[item]}', ` 
    }
  })
  sql += `where id='${id}';`
  return EXEC(sql).then(data => {
    if (data.affectedRows > 0) {
      return true
    }
    return false
  })
}

module.exports = {
  userlogin,
  userList,
  getUser,
  addUser,
  updateUser
}