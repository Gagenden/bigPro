var express = require('express');

var mongoose = require('mongoose');

var Teacher = require('../../../models/teacher');

// 管理员修改教师密码

module.exports = function(router){
  //修改密码
  router.post('/admin/changePassT',function(req,res){
    Teacher.findOneAndUpdate({
      accountNumber: req.body.accountNumber
    },{password: req.body.newPass},function(err,ret){
      if(err){
        console.log('更新失败');
      }else{
        console.log('更新成功');
        // console.log(ret);
        res.send({changePasswordT:true});
      }
    })
  });

  // 绑定账号
  router.get('/admin/changePassT',function(req,res){
    Teacher.find(function(err,ret){
      if(err){
        console.log('查询失败');
      }else{
        // console.log(ret);
        res.send(ret);
      }
    });
  });
}