var express = require('express');

var mongoose = require('mongoose');

var Admin = require('../../models/admin');

// 查看管理员的信息
var adminInfo = function(app){
  app.get('/admin/adminInfo',function(req,res){
    // debugger;
    var acNum = req.query;
    //判断传过来的id和数据库的哪个相同，就返回哪个的数据
    Admin.findOne({
      acNum: acNum.acNum
    },function(err, ret){
      if(err){
        console.log(err);
      }else if( ret == null ){
        console.log('不存在用户,这是不可能的');
      }else{
        // console.log(ret);
        //怎么把数据返回
        res.send(ret);
      }

    });
   
   
  });
}

module.exports = adminInfo;