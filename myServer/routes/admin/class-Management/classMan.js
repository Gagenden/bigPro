var express = require('express');

var mongoose = require('mongoose');

var Class = require('../../../models/class');
var Student = require('../../../models/student');

module.exports = function (router) {
  //查看班级信息请求
  router.get('/admin/classMan', function (req, res) {
    // console.log(Object.keys(req.body).length)
    //查询class表中的所有数据
    Class.find(function (err, ret) {
      if (err) {
        console.log('查询失败');
      } else {
        // console.log(ret);
        res.send(ret);
      }
    });
  });

  //删除班级请求
  router.post('/admin/classMan', function (req, res) {
    // console.log( req.body.majorClass);
    // 根据请求的数据--专业班级是唯一的 ，删除班级,也要删除这个班级的人
    Class.deleteOne({
      major: req.body.majorClass.major,
      className: req.body.majorClass.class
    }, function (err, ret) {
      if (err) {
        console.log('删除班级失败');
        res.send({
          remove: false
        });
      } else {
        console.log('删除班级成功');
        res.send({
          remove: true
        });
      }
    });

    //删除这个班级对应的学生
    Student.deleteMany({
      major: req.body.majorClass.major,
      class: req.body.majorClass.class
    }, function (err, ret) {
      if (err) {
        console.log("删除该班级人数出现错误");
      } else {
        console.log(ret);
      }
    });
  });

  //编辑班级请求
  router.post('/admin/classMan/edit', function (req, res) {
    // console.log(req.body.majorClass.major);
    // 先查看修改后的专业班级，数据库是否存在
    Class.findOne({
      major: req.body.major,
      className: req.body.className
    }, function (err, result) {
      if (err) {
        console.log('查询班级，出现错误');
      } else if (result != null) {
        console.log('班级已存在，不可以修改');
        res.send({
          editClass: false
        });
      } else { //然后才更新
        Class.findOneAndUpdate({
          major: req.body.majorClass.major,
          className: req.body.majorClass.class
        }, {
          major: req.body.major,
          className: req.body.className
        }, function (err, ret) {
          if (err) {
            console.log('更新班级表，出现错误');
          } else {
            console.log('更新成功');
            // console.log(ret);
            res.send({
              editClass: true
            });
            // 修改班级成功之后，对应的学生班级也要修改
            Student.update({
              major: req.body.majorClass.major,
              class: req.body.majorClass.class
            },{
              major: req.body.major,
              class: req.body.className
            },{
              multi: true
            }, function(err,ret){
              if (err) {
                console.log('更新学生表，出现错误');
              } else {
                console.log('更新学生表也成功');
              }
            });
          }
        })
      }
    })

  })
}