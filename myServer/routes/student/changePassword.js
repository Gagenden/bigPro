var express = require('express');

var mongoose = require('mongoose');

var Student = require('../../models/student');

module.exports = function (router) {
  // 处理修改密码的请求
  router.get('/student/changePasswordByS', function (req, res) {
    Student.findOneAndUpdate({
      studentId: req.query.studentId
    }, {
      password: req.query.password
    }, function (err, ret) {
      if (err) {
        console.log('更新密码错误');
        res.send({
          changePasswordByS: false
        });
      } else {
        res.send({
          changePasswordByS: true
        });
      }
    })
  });
  // 处理获取原来密码的请求
  router.post('/student/changePasswordByS', function (req, res) {
    Student.findOne({
      studentId: req.body.studentId
    }, function (err, ret) {
      if (err) {
        console.log('查询教师，出现错误！');
      } else if (ret == null) {
        console.log('不存在这个学生，这是不存在的！');
      } else {
        res.send(ret);
      }
    })
  });
}