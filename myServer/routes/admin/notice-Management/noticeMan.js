var express = require('express');

var mongoose = require('mongoose');

var Notice = require('../../../models/notice');

module.exports = function(router){
  // 处理查看公告的请求
  router.post('/admin/noticeMan',function(req,res){
    // 查询公告表的所有的数据
    Notice.find(function(err,ret){
      if(err){
        console.log('查询公告表数据错误！');
      }else{
        res.send(ret);
        // console.log(ret);
      }
    });
  });

  // 处理删除公告的请求
  router.get('/admin/noticeMan',function(req,res){
    // console.log(req.query);
    // 根据title来删除，title是唯一的
    Notice.deleteOne({
      title: req.query.title
    },function(err,ret){
      if(err){
        console.log('删除公告错误');
        res.send( {removeNotice: false} );
      }else{
        console.log('删除公告成功');
        res.send( {removeNotice: true} );
      }
    })
  });
};