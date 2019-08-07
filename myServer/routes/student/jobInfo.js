var express = require('express');

var mongoose = require('mongoose');

var PublishJob = require('../../models/publishJob');
var SubmitJob = require('../../models/submitJob');
var Student = require('../../models/student');

module.exports = function(router){
  // 获得老师发布作业的信息
  router.post('/student/jobInfo/getPublishJob',function(req,res){
    // 先根据学号获得专业班级的信息
    Student.findOne({
      studentId: req.body.studentId
    },function(err,ret){
      if(err){
        console.log('查询学生表，出现错误！');
      }else if(ret == null){ 
        console.log('这是不存在的，学生肯定是有的');
      }else{
        PublishJob.find({
          class: ret.class,
          major: ret.major
        },function(err,result){
          if(err){
            console.log('查询教师发布的作业表，出现错误！');
          }else{
            res.send(result);
          }
        });
      }
    })
  });

  // 获得作业的状态
  router.post('/student/jobInfo/getState',function(req,res){
    // console.log(req.body);
    let arr=[];
    SubmitJob.findOne({
      studentId: req.body.studentId,
      jobName: req.body.jobName
    },function(err,ret){
      arr.push({'index':req.body.index})
      if(err){
        console.log('出错');
      }else{
        // console.log(ret);
        // res.send(ret);
        if(ret == null){
          // arr.push({jobState: '未完成'})
          arr.push(ret);
          res.send( JSON.stringify(arr) );
        }else{
          arr.push(ret)
          res.send( JSON.stringify(arr) );
        }
      }
    })
  });

  // 获得老师的评阅信息
  router.post('/student/jobInfo/getComment',function(req,res){
    // console.log(req.body);
    SubmitJob.findOne({
      studentId: req.body.studentId,
      jobName: req.body.jobName
    },function(err,ret){
      if(err){
        console.log('查询发布的作业，出现错误！');
      }else if(ret == null){
        console.log('不存在，这是不存在的');
      }else{
        // console.log(ret);
        res.send(ret);
      }
    })
  });
}