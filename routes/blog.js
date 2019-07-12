const express = require('express');
const router = express.Router();
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

// 博客列表
router.get(`/list`, (req, res, next) => {
  let author = req.query.author || ''
  const keyword = req.query.keyword || ''
  if (req.query.isadmin) {
    if (req.session.username == null) {
      res.json(new ErrorModel('尚未登录'))
      return
    }
    author = req.session.username
  }
  const result = getList(author, keyword)
  return result.then(listData => {
    res.json(new SuccessModel(listData))
  })
});

// 博客详情
router.get(`/detail`, (req, res, next) => {
  const result = getDetail(req.query.id)
  return result.then(detailData => {
    res.json(new SuccessModel(detailData))
  })
});

// 新增博客
router.post(`/new`, loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  const result = newBlog(req.body)
  return result.then(blogData => {
    res.json(new SuccessModel(blogData, '新增博客成功'))
  })
});

// 更新博客
router.post(`/update`, loginCheck, (req, res, next) => {
  const { title, content } = req.body
  const result = updateBlog(req.query.id, title, content)
  return result.then(val => {
    if (val) {
      res.json(new SuccessModel(val, '更新博客成功'))
    } else {
      res.json(new ErrorModel('更新博客失败'))
    }
  })
});

// 删除博客
router.post(`/delete`, loginCheck, (req, res, next) => {
  const author = req.session.username
  const result = deleteBlog(req.query.id, author)
  return result.then(val => {
    if (val) {
      res.json(new SuccessModel(val, '删除成功'))
    } else {
      res.json(new ErrorModel('删除博客失败'))
    }
  })
});

module.exports = router;
