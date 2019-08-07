var express = require('express');

var mongoose = require('mongoose');

var Teacher = require('../../models/teacher');

module.exports = function(router){
  // 处理教师修改密码的请求
  router.get('/teacehr/changePasswordByT',function(req,res){
    console.log(req.query);
    Teacher.findOneAndUpdate({
      accountNumber: req.query.accountNumber
    },{password: req.query.password},function(err,ret){
      if(err){
        console.log('修改教师密码失败');
        res.send( {changePasswordByT: false} ); 
      }else if(ret != null){
        console.log('修改教师密码成功');
        res.send( {changePasswordByT: true} ); 
      }else{
        console.log('不存在这个教师，这是不存在的！');
        res.send( {changePasswordByT: false} ); 
      }
    })
  });

  // 处理获取原来密码的请求
  router.post('/teacehr/changePasswordByT',function(req,res){
    Teacher.findOne({
      accountNumber: req.body.accountNumber
    },function(err,ret){
      if(err){
        console.log('查询老师，出现错误！');
      }else if(ret == null){
        console.log('不存在这个老师，这是不存在的！');
      }else{
        res.send(ret);
      }
    })
  }); 
}