var express = require('express');

var mongoose = require('mongoose');

var SubmitJob = require('../../models/submitJob');
var PublishJob = require('../../models/publishJob');

// 查看作业----查看学生提交的作业，评阅作业
module.exports = function(router){
  // 处理初始化数据的请求
  router.get('/teacher/subjobInfo',function(req,res){
    SubmitJob.find({
      teacherId: req.query.teacherId
    },function(err,ret){
      if(err){
        console.log('出错');
      }else if(ret.length == 0){
        console.log('没有人提交作业');
      }else{
        // console.log(ret);
        res.send(ret);
      }
    })
  });

  // 评阅作业
  router.post('/teacher/subjobInfo/comment',function(req,res){
    console.log(req.body);
    SubmitJob.findOneAndUpdate({
      jobName: req.body.jobName,
      file: 'submitJob/' + req.body.file,
      studentId: req.body.studentId
    },{
      grade: req.body.grade,
      comment: req.body.comment,
      commentTime: req.body.commentTime
    },function(err,ret){
      if(err){
        console.log('更新错误！');
        res.send( {comment: false} )
      }else{
        console.log('更新成功')
        res.send( {comment: true} )
      }
    })
  });

  //获得作业名称
  router.get('/teacher/subjobInfo/getJobName',function(req,res){
    SubmitJob.find({
      teacherId: req.query.teacherId
    },function(err,ret){
      if(err){
        console.log('出错');
      }else if(ret.length == 0){
        console.log('没有人提交作业');
      }else{
        // console.log(ret);
        res.send(ret);
      }
    })
  });
}