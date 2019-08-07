var express = require('express');
// Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据
var multer = require('multer');
var fs = require('fs');
var pathLib = require('path');

var mongoose = require('mongoose');

var SubmitJob = require('../../models/submitJob');
var Student = require('../../models/student');
var PublishJob = require('../../models/publishJob');

// 上传成功之后，文件保存到这里
var upload = multer({
  dest: './submitJob/'
}).any();

module.exports = function (router) {
  // 提交作业
  router.post('/student/subJob', upload, function (req, res) {
    // 时间处理
    req.body.submitTime = timeHandle(new Date(req.body.submitTime));

    // console.log(req.files);
    // 注意接收到的文件要用fs重命名一下，
    // path是保存在服务器的路径， 注意他是没有后缀的，或许是为了安全，这点特别麻烦。没有后缀的文件，不能正常的使用
    // 新路径
    var newPath = req.files[0].destination + '/' + req.files[0].originalname;

    // 文件保存的路径
    var fileNewname = 'submitJob/' + req.files[0].originalname;
    fs.rename(req.files[0].path, newPath, function (err) {
      if (err) {
        res.send('出错了')
      } else {
        res.send( {submitJob: true} );

        // 上传成功之后，把数据保存到数据库中
        // 注意：这里保存的是文件路径
        
        // 根据学号获得学生的名字
        Student.findOne({
          studentId: req.body.studentId
        }, function (err, ret) {
          if (err) {
            console.log('查询学生表，出现错误！');
          } else {
            // 根据专业班级，作业名称 获得老师的id
            PublishJob.findOne({
              jobName: req.body.jobName,
              major: ret.major,
              class: ret.class
            },function(err,result){
              if(err){
                console.log('出错');
              }else{
                // console.log(result);
                var src = {
                  jobName: req.body.jobName, //作业名称
                  file: fileNewname, //文件路径
                  student: ret.name, //提交作业的学生
                  major: ret.major,
                  class: ret.class,
                  submitTime: req.body.submitTime,
                  comment: '',
                  grade: '',
                  commentTime: '',
                  state: '完成',
                  studentId: req.body.studentId,
                  teacherId: result.teacherId
                };
                new SubmitJob(src).save(function (err, result) {
                  if (err) {
                    console.log('保存数据到提交的作业，出现错误！');
                  } else {
                    // console.log(result);
                    console.log('保存数据到提交的作业成功！');
                  }
                })
              }
            })
           
           
          }
        })
      };
    })
  });

  // 获得作业名称的请求,根据学生的班级来确认作业名字
  router.post('/student/subJob/getJobName',function(req,res){
    Student.findOne({
      studentId: req.body.studentId
    },function(err,result){
      if(err){
        console.log('查询学生表，出现错误');
      }else{
        PublishJob.find({
          major: result.major,
          class: result.class
        },function(err,ret){
          if(err){
            console.log('查询发布的作业表，出现错误！');
          }else{
            res.send(ret);
          }
        });
      }
    })
  });

  // 获得作业的截止时间，根据作业名称来获取
  router.post('/student/subJob/getDeadLine',function(req,res){
    PublishJob.findOne({
      jobName: req.body.jobName
    },function(err,ret){
      if(err){
        console.log('查询发布的作业表，出现错误！');
      }else{
        // console.log(ret);
        res.send(ret);
      }
    })
  });

  // 获取作业的状态，判断作业有没有提交过
  router.post('/student/subJob/getState',function(req,res){
    SubmitJob.findOne({
      studentId: req.body.studentId,
      jobName: req.body.jobName
    },function(err,ret){
      if(err){
        console.log('查询提交作业出错');
      }else if(ret == null){ // 说明这个学生还没有提交这个作业
        res.send( {submitJobState: true} );
      }else{  // 说明该学生已经提交过了作业，不可以在提交
        res.send( {submitJobState: false} );        
      }
    });
  })

  // 处理时间
  function timeHandle(dt){
    var y = dt.getFullYear();
    // 使用ES6的padStart方法补0
    var m = (dt.getMonth() + 1).toString().padStart(2, '0');
    var d = dt.getDate().toString().padStart(2, '0');

    dt = `${y}.${m}.${d}`;
    return dt;
   
  }
}