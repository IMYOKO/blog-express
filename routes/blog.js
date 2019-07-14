const express = require('express');
const router = express.Router();
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
const jwtauth = require('../middleware/jwtauth')

// 博客列表
router.get(`/list`, jwtauth, (req, res, next) => {
  let author = req.query.author || ''
  const keyword = req.query.keyword || ''
  if (req.query.isadmin) {
    if (req.iss.username == null) {
      res.json(new ErrorModel('尚未登录'))
      return
    }
    author = req.iss.username
  }
  const result = getList(author, keyword)
  return result.then(listData => {
    res.json(new SuccessModel(listData))
  })
});

// 博客详情
router.get(`/detail`, jwtauth, (req, res, next) => {
  const result = getDetail(req.query.id)
  return result.then(detailData => {
    res.json(new SuccessModel(detailData))
  })
});

// 新增博客
router.post(`/new`, jwtauth, (req, res, next) => {
  req.body.author = req.iss.username
  const result = newBlog(req.body)
  return result.then(blogData => {
    res.json(new SuccessModel(blogData, '新增博客成功'))
  })
});

// 更新博客
router.post(`/update`, jwtauth, (req, res, next) => {
  const { title, content } = req.body
  const result = updateBlog(req.iss.id, title, content)
  return result.then(val => {
    if (val) {
      res.json(new SuccessModel(val, '更新博客成功'))
    } else {
      res.json(new ErrorModel('更新博客失败'))
    }
  })
});

// 删除博客
router.post(`/delete`, jwtauth, (req, res, next) => {
  const author = req.iss.username
  const result = deleteBlog(req.iss.id, author)
  return result.then(val => {
    if (val) {
      res.json(new SuccessModel(val, '删除成功'))
    } else {
      res.json(new ErrorModel('删除博客失败'))
    }
  })
});

module.exports = router;
