var express = require('express');
var nodeExcel = require('excel-export');

var mongoose = require('mongoose');
var PublishJob = require('../../models/publishJob');
var SubmitJOb = require('../../models/submitJob');

module.exports = function(router){
  // 根据发布老师 获得专业班级，作业名称
  router.post('/teacher/viewScore/init',function(req,res){
    // console.log(req.body);
    PublishJob.find({
      teacherId: req.body.teacherId
    }, function(err,ret){
      if(err){
        console.log('查询发布的作业，出现错误');
      }else{
        res.send(ret);
        // console.log(ret)
      }
    });
  });

  // 查看成绩
  router.post('/teacher/viewScore',function(req,res){
    // 先查看作业是否存在
    PublishJob.findOne({
      jobName: req.body.jobName,
      major: req.body.major,
      class: req.body.class
    },function(err,ret){
      if(err){
        console.log('查询发布的作业，出现错误');
      }else if(ret == null){
        res.send( {noJob: true} );
        console.log('作业不存在');
      }else{
        // 判断作业提交与否
        SubmitJOb.find({
          jobName: req.body.jobName,
          major: req.body.major,
          class: req.body.class
        },function(err,ret){
          if(err){
            console.log('查询提交的作业，出现错误');
          }else if(ret.length == 0){
            console.log('该作业没有人提交');
            res.send( {noSubmitJob: true} );
          }else{
            res.send(ret);
          }
        });
      }
    });
  })

  // 导出excel
  router.get('/teacher/viewScore/download',function(req,res){
    // SubmitJOb.find({
    //   jobName: req.query.jobName,
    //   major: req.query.major,
    //   class: req.query.class
    // },function(err,result){
    //   if(err){
    //     console.log('查询提交的作业，错误');
    //   }else if(result.length == 0){
    //     console.log('不存在，这是不可能的');
    //   }else{
    //     res.send(result);  
    //   }
    // });
     // 先查看作业是否存在
     PublishJob.findOne({
      jobName: req.query.jobName,
      major: req.query.major,
      class: req.query.class
    },function(err,ret){
      if(err){
        console.log('查询发布的作业，出现错误');
      }else if(ret == null){
        res.send( {noJob: true} );
        console.log('作业不存在');
      }else{
        // 判断作业提交与否
        SubmitJOb.find({
          jobName: req.query.jobName,
          major: req.query.major,
          class: req.query.class
        },function(err,ret){
          if(err){
            console.log('查询提交的作业，出现错误');
          }else if(ret.length == 0){
            console.log('该作业没有人提交');
            res.send( {noSubmitJob: true} );
          }else{
            res.send(ret);
          }
        });
      }
    });
  })
}