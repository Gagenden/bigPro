var express = require('express');

var mongoose = require('mongoose');

var Teacher = require('../../models/teacher');

module.exports = function(router){
  // 处理查看教师信息的请求
  router.post('/teacher/teaInfo',function(req,res){
    // console.log(req.body);
    Teacher.findOne({
      accountNumber: req.body.accountNumber
    },function(err,ret){
      if(err){
        console.log('查询教师出现错误');
      }else{
        res.send(ret);
      }
    });
    
  });
}