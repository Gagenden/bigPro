var express = require('express');

var mongoose = require('mongoose');

var Teacher = require('../../../models/teacher');

module.exports = function (router) {
  //查看教师的信息
  router.get('/admin/teacherMan', function (req, res) {
    Teacher.find(function (err, ret) {
      if (err) {
        console.log('查询失败！');
      } else {
        res.send(ret);
      }
    });
  });
  // 删除教师的请求
  router.post('/admin/teacherMan', function (req, res) {
    // 根据教师账号删除教师
    Teacher.deleteOne({
      accountNumber: req.body.accountNumber
    }, function (err, ret) {
      if (err) {
        console.log('删除教师时，出现错误！');
      } else {
        console.log(ret);
        res.send({
          removeTea: true
        });
      }
    });
  });
  // 修改教师的基本信息
  router.post('/admin/teacherMan/edit', function (req, res) {
    // 先判断账号有没有修改
    // 账号没有修改，直接更新数据
    // console.log(req.body.accountNumberOld == req.body.accountNumber)
    if(req.body.accountNumberOld == req.body.accountNumber){
      Teacher.findOne({
        accountNumber: req.body.accountNumber,
        name: req.body.name,
        sex: req.body.sex,
        age: req.body.age
      },function(err,ret){
        if(err){
          console.log('查询教室表，出现错误！');
        }else if(ret != null){
          res.send( {editTeacher: false} );
        }else{
          Teacher.findOneAndUpdate({
            accountNumber: req.body.accountNumber
          },{
            name: req.body.name,
            sex: req.body.sex,
            age: req.body.age
          },function(err,ret){
            if(err){
              console.log('更新教师表，出现错误');
            }else{
              res.send( {editTeacher: true} );
            }
          })
        }
      })
    }
    // 如果账号修改了，则先判断账号,再修改
    if(req.body.accountNumberOld != req.body.accountNumber){
      Teacher.findOne({
        accountNumber: req.body.accountNumber
      },function(err,ret){
        if(err){
          console.log('查询教师表，出现错误！');
        }else if(ret != null){  // 说明账号，数据库有
          console.log('账号已存在');
          res.send( {editTeacherN: false});
        }else{
          // console.log(ret);
          Teacher.findOneAndUpdate({
            accountNumber: req.body.accountNumberOld
          },{
            accountNumber: req.body.accountNumber,
            name: req.body.name,
            sex: req.body.sex,
            age: req.body.age
          },function(err,ret){
            if(err){
              console.log('更新教师表，出现错误');
            }else{
              res.send( {editTeacherN: true} );
            }
          })
        }
      })
    }
  });
}