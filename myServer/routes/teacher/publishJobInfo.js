var express = require('express');

var mongoose = require('mongoose');

var PublishJob = require('../../models/publishJob');

module.exports = function(router){
  // 获得发布的作业信息
  router.post('/teacher/publishJobInfo',function(req,res){
    PublishJob.find({
      teacherId: req.body.teacherId
    },function(err,ret){
      if(err){
        console.log('查询发布的作业，出现错误！');
      }else if(ret.length != 0){
        res.send(ret);
      }else{
        console.log('该老师未发布作业');
      }
    })
  });
}