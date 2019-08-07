var express = require('express');

var mongoose = require('mongoose');

var Admin = require('../../models/admin');

// 管理员修改密码
module.exports = function(router){
  // 处理修改管理员的密码的请求 
  router.post('/admin/changePassword',function(req,res){
    Admin.findOneAndUpdate({
      acNum: req.body.acNum
    },{password: req.body.password},function(err,ret){
      if(err){
        console.log('修改管理员密码失败');
      }else if(ret != null){
        console.log('修改管理员密码成功');
        res.send( {changePass: true} ); 
      }else{
        console.log('不存在这个管理员，这是不存在的');
        res.send( {changePass: false} ); 
      }
    });
    
  })
  // 获得管理员的信息
  router.get('/admin/changePassword',function(req,res){
    Admin.findOne({
      acNum: req.query.acNum
    }, function(err,ret){
      if(err){
        console.log('查询管理员，出现错误！');
      }else if(ret == null){
        console.log('不存在这个管理员，这是不存在的！');
      }else{
        res.send(ret);
      }
    })
  })
}