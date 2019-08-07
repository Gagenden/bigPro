var express = require('express');
// Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据
var multer = require('multer');
var pathLib = require('path');
var fs = require('fs');

var mongoose = require('mongoose');

var Class = require('../../models/class');
var Teacher = require('../../models/teacher');
var PublishJob = require('../../models/publishJob');

// 上传成功之后，文件保存到这里
var upload = multer({
  dest: './publishJob/'
}).any();

// 老师发布作业的路由
module.exports = function (router) {
  // 获得班级的信息
  router.get('/teacher/publishJob/getClass', function (req, res) {
    Class.find(function (err, ret) {
      if (err) {
        console.log('查询班级表，出现错误！');
      } else {
        res.send(ret);
      }
    })
  });
  // 处理发布作业的请求
  router.post('/teacher/publishJob', upload, function (req, res) {

    // 时间处理
    req.body.deadLine = timeHandle(new Date(req.body.deadLine))
    req.body.publishTime = timeHandle(new Date(req.body.publishTime)); // console.log(req.body.jobName)
    // 新路径
    var newPath = req.files[0].destination + req.files[0].originalname;
    // console.log(newPath);
    // 文件保存的路径
    var fileNewname = 'publishJob/' + req.files[0].originalname;
    // console.log(fileNewname);
    // 先根据作业名称查找对应的老师账号
    PublishJob.find({
      jobName: req.body.jobName
    }, function (err, ret) {
      var judge = 0;
      if (err) {
        console.log('出错');
      } else if (ret.length != 0) { //作业名称已存在的情况 
        // console.log(ret)
        for (var i = 0; i < ret.length; i++) {
          if (ret[i].teacherId.indexOf(req.body.accountNumber) == -1) {
            judge++;
          }
        }
        if (judge != 0) { // 不同的老师应该发布不同的作业
          res.send({
            jib: true
          });
        } else { // 更新作业
          Teacher.findOne({ // 获得教师的姓名  ret.name
            accountNumber: req.body.accountNumber
          }, function (err, ret) {
            if (err) {
              console.log('查询教师表，出现错误！');
            } else {
              fs.rename(req.files[0].path, newPath, function (err) {
                if (err) {
                  res.send('出错了');
                } else {
                  // 上传同一个文件，后面的会覆盖前面的那个
                  console.log('上传成功了');
                  res.send({
                    publishJob: true
                  });
                  PublishJob.findOneAndUpdate({
                    jobName: req.body.jobName,
                  }, {
                    jobName: req.body.jobName, //作业名称
                    file: fileNewname, //文件路径
                    teacher: ret.name, //发布作业的老师
                    publishTime: req.body.publishTime,
                    deadLine: req.body.deadLine,
                    major: req.body.major,
                    class: req.body.class,
                    teacherId: req.body.accountNumber
                  }, function (err, result) {
                    if (err) {
                      console.log('更新数据到发布的作业，出现错误！');
                    } else {
                      console.log('更新数据到发布的作业成功！');
                    }
                  })
                }
              });
            }
          });
        }
      } else { // 发布一种新的作业名称
        fs.rename(req.files[0].path, newPath, function (err) {
          if (err) {
            res.send('出错了');
          } else {
            // 上传同一个文件，后面的会覆盖前面的那个
            console.log('上传成功了');
            res.send({
              publishJob: true
            });
            // 上传成功之后，把数据保存到数据库中
            // 注意：这里保存的是文件路径
            Teacher.findOne({ // 获得教师的姓名  ret.name
              accountNumber: req.body.accountNumber
            }, function (err, ret) {
              if (err) {
                console.log('查询教师表，出现错误！');
              } else {
                // 判断该路径是否存在，存在就不再次保存
                PublishJob.findOne({
                  file: 'publishJob/' + req.files[0].originalname,
                  jobName: req.body.jobName,
                  class: req.body.class,
                  major: req.body.major,
                  teacherId: req.body.accountNumber
                }, function (err, result) {
                  if (err) {
                    console.log('查询发布作业表，出现错误！');
                  } else if (result != null) { // 说明这个路径已存在，但是其他数据需要更新
                    console.log('该作业已存在，不需要再保存这个路径');
                    PublishJob.findOneAndUpdate({
                      file: result.file,
                    }, {
                      jobName: req.body.jobName, //作业名称
                      file: fileNewname, //文件路径
                      teacher: ret.name, //发布作业的老师
                      publishTime: req.body.publishTime,
                      deadLine: req.body.deadLine,
                      major: req.body.major,
                      class: req.body.class,
                      // state: '未完成'
                      teacherId: req.body.accountNumber
                    }, function (err, result) {
                      if (err) {
                        console.log('更新数据到发布的作业，出现错误！');
                      } else {
                        console.log('更新数据到发布的作业成功！');
                      }
                    })
                  } else { // 开始 
                    var publishJob = {
                      jobName: req.body.jobName, //作业名称
                      file: fileNewname, //文件路径
                      teacher: ret.name,
                      publishTime: req.body.publishTime,
                      deadLine: req.body.deadLine,
                      major: req.body.major,
                      class: req.body.class,
                      // state: '未完成'
                      teacherId: req.body.accountNumber
                    };
                    // 然后保存文件
                    new PublishJob(publishJob).save(function (err, result) {
                      if (err) {
                        console.log('保存数据到发布的作业，出现错误！');
                        res.send({
                          publishJob: false
                        });
                      } else {
                        // console.log(result);
                        console.log('保存数据到发布的作业成功！');
                      }
                    })
                  }
                });



              }
            });
          }
        });
      }
    })
  });

  // 处理时间
  function timeHandle(dt) {
    var y = dt.getFullYear();
    // 使用ES6的padStart方法补0
    var m = (dt.getMonth() + 1).toString().padStart(2, '0');
    var d = dt.getDate().toString().padStart(2, '0');

    dt = `${y}.${m}.${d}`;
    return dt;

  }
}