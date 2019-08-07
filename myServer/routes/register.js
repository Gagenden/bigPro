var express = require("express");

var mongoose = require("mongoose");

var Student = require("../models/student");
var Teacher = require("../models/teacher");
var Class = require("../models/class");

// 注册页面 处理注册页面的数据
module.exports = function(router) {
  router.post("/register", function(req, res) {
    //获取表单提交的数据 req.body
    var body = req.body;
    // 先判断身份
    if (body.job == "老师") {
      Teacher.findOne(
        {
          accountNumber: body.acNum
        },
        function(err, ret) {
          if (err) {
            console.log("查询教师，出现错误！");
          } else if (ret != null) {
            console.log("该教师账号已存在");
            res.send({ isRegister: false });
          } else {
            res.send({ isRegister: true });
            // 注意：注册成功之后需要把数据保存到数据库中
            new Teacher({
              accountNumber: body.acNum,
              password: body.password,
              name: body.name,
              sex: body.sex,
              age: body.age
            }).save(function(err, ret) {
              if (err) {
                console.log("保存失败");
              } else {
                console.log("保存成功");
                console.log(ret);
              }
            });
          }
        }
      );
    }
    //与数据库的账号对比，看账号是否存在一样的
    // 如果存在，则不可以注册
    if (body.job == "学生") {
      // 注意账号是唯一的
      Student.findOne(
        {
          studentId: body.acNum
        },
        function(err, ret) {
          if (err) {
            console.log("查询学生，出现错误！");
          } else if (ret != null) {
            console.log("该学生账号已存在");
            res.send({ isRegister: false });
          } else {
            res.send({ isRegister: true });
            // 注意：注册成功之后需要把数据保存到数据库中
            new Student({
              studentId: body.acNum,
              password: body.password,
              name: body.name,
              sex: body.sex,
              age: body.age,
              major: body.major,
              class: body.class
            }).save(function(err, ret) {
              if (err) {
                console.log("保存失败");
              } else {
                console.log("保存成功");
                console.log(ret);
              }
            });
          }
        }
      );
    }
  });

  // 处理专业班级初始化所需要的数据
  router.get("/register", function(req, res) {
    Class.find(function(err, ret) {
      if (err) {
        console.log("查询班级，出现错误！");
      } else {
        res.send(ret);
      }
    });
  });
};
