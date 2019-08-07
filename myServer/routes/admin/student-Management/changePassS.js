var express = require('express');

var mongoose = require('mongoose');

var Student = require('../../../models/student');

// 管理员修改学生密码

module.exports = function(router){
  //修改密码
  router.post('/admin/changePassS',function(req,res){
    Student.findOneAndUpdate({
      studentId: req.body.studentId
    },{password: req.body.newpass},function(err,ret){
      if(err){
        console.log('更新失败');
      }else{
        console.log('更新成功');
        console.log(ret);
        res.send({changePasswordS:true});
      }
    })
  });

  // 绑定账号
  router.get('/admin/changePassS',function(req,res){
    Student.find(function(err,ret){
      if(err){
        console.log('查询失败');
      }else{
        // console.log(ret);
        res.send(ret);
      }
    });
  });
}