var express = require('express');

var mongoose = require('mongoose');

var Student = require('../../models/student');

module.exports = function (router) {
  router.get('/student/stuInfo', function (req, res) {
    Student.findOne({
      studentId: req.query.studentId
    }, function (err, ret) {
      if (err) {
        console.log('查询学生，出现了错误！');
      } else if (ret != null) {
        res.send(ret);
      } else {
        console.log('学生账号不存在，这是不可能的！');
      }
    })
  })
}