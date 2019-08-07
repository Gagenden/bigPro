var express = require("express");

var mongoose = require("mongoose");

var Student = require("../../../models/student");
var Class = require("../../../models/class");

module.exports = function(router) {
  // 查看学生信息
  router.post("/admin/studentMan", function(req, res) {
    Student.find(function(err, ret) {
      if (err) {
        console.log("查询学生失败！！");
      } else {
        // console.log(ret);
        res.send(ret);
      }
    });
  });
  // 获取班级信息
  router.post("/admin/studentMan/getMC", function(req, res) {
    Class.find(function(err, ret) {
      if (err) {
        console.log("查询班级，出现错误！");
      } else {
        res.send(ret);
      }
    });
  });
  // 修改学生的信息
  router.post("/admin/studentMan/edit", function(req, res) {
    var body = req.body;
    // console.log(body);
    // 先判断学号有没有修改,没有修改
    if (req.body.studentId == req.body.studentIdOld) {
      // 然后在判断数据是否有更新
      Student.findOne(
        {
          studentId: body.studentId,
          name: body.name,
          sex: body.sex,
          age: body.age,
          major: body.major,
          class: body.class
        },
        function(err, result) {
          if (err) {
            console.log("查询学生表，出现错误！");
            // console.log(err);
          } else if (result != null) {
            // 说明数据已存在
            res.send({ editStudent: false });
          } else {
            // 更新数据
            // 判断班级是否存在
            Class.findOne(
              {
                className: body.class,
                major: body.major
              },
              function(err, ret) {
                if (err) {
                  console.log("查询班级，出现错误！");
                } else if (ret != null) {
                  // 班级存在，才可以修改

                  // 判断专业班级修改了，那么修改前的班级人数减一，后的班级人数加一
                  var oldMC = body.majorOld + body.classOld;
                  var newMC = body.major + body.class;
                  if(oldMC != newMC){
                    // 原来的班级人数减一
                    Class.findOne({
                      major: body.majorOld,
                      className: body.classOld
                    },function(err,ret){
                      if(err){
                        console.log('查询错误');
                      }else if(ret != null){   
                        // 如果添加了这个班级的一个人，那么这个班级的人数加1
                        ret.count--;
                        // 然后把更新的数据保存到class数据表中
                        new Class(ret).save(function(err,result){
                          if(err){
                            console.log('保存数据到class表中失败');
                          }else{
                            console.log('保存成功！');
                          }
                        })
                      }else{
                        console.log('不存在这个班');    
                      }
                    })
                    // 修改的班级人数加一
                    Class.findOne({
                      major: body.major,
                      className: body.class
                    },function(err,ret){
                      if(err){
                        console.log('查询错误');
                      }else if(ret != null){   
                        // 如果添加了这个班级的一个人，那么这个班级的人数加1
                        ret.count++;
                        // 然后把更新的数据保存到class数据表中
                        new Class(ret).save(function(err,result){
                          if(err){
                            console.log('保存数据到class表中失败');
                          }else{
                            console.log('保存成功！');
                          }
                        })
                      }else{
                        console.log('不存在这个班');    
                      }
                    })
                  }
                  // 修改信息
                  Student.findOneAndUpdate(
                    {
                      studentId: body.studentId
                    },
                    {
                      studentId: body.studentId,
                      name: body.name,
                      sex: body.sex,
                      age: body.age,
                      major: body.major,
                      class: body.class
                    },
                    function(err, ret) {
                      if (err) {
                        console.log("更新错误！");
                      } else {
                        res.send({ editStudent: true });
                      }
                    }
                  );
                } else {
                  // 班级不存在
                  res.send({ editStudentC: false });
                }
              }
            );
          }
        }
      );
    } else {
      // 账号修改了,先判断账号是不是唯一的
      Student.findOne(
        {
          studentId: body.studentId
        },
        function(err, ret) {
          if (err) {
            console.log("查询学生表，出现错误！");
          } else if (ret != null) {
            // 说明账号已存在，不可更新
            res.send({ editStudentS: false });
          } else {
            // 判断班级是否存在
            Class.findOne(
              {
                className: body.class,
                major: body.major
              },
              function(err, ret) {
                if (err) {
                  console.log("查询班级，出现错误！");
                } else if (ret != null) {
                  // 班级存在，才可以修改

                  // 判断专业班级修改了，那么修改前的班级人数减一，后的班级人数加一
                  var oldMC = body.majorOld + body.classOld;
                  var newMC = body.major + body.class;
                  if(oldMC != newMC){
                    // 原来的班级人数减一
                    Class.findOne({
                      major: body.majorOld,
                      className: body.classOld
                    },function(err,ret){
                      if(err){
                        console.log('查询错误');
                      }else if(ret != null){   
                        // 如果添加了这个班级的一个人，那么这个班级的人数加1
                        ret.count--;
                        // 然后把更新的数据保存到class数据表中
                        new Class(ret).save(function(err,result){
                          if(err){
                            console.log('保存数据到class表中失败');
                          }else{
                            console.log('保存成功！');
                          }
                        })
                      }else{
                        console.log('不存在这个班');    
                      }
                    })
                    // 修改的班级人数加一
                    Class.findOne({
                      major: body.major,
                      className: body.class
                    },function(err,ret){
                      if(err){
                        console.log('查询错误');
                      }else if(ret != null){   
                        // 如果添加了这个班级的一个人，那么这个班级的人数加1
                        ret.count++;
                        // 然后把更新的数据保存到class数据表中
                        new Class(ret).save(function(err,result){
                          if(err){
                            console.log('保存数据到class表中失败');
                          }else{
                            console.log('保存成功！');
                          }
                        })
                      }else{
                        console.log('不存在这个班');    
                      }
                    })
                  }

                  Student.findOneAndUpdate(
                    {
                      studentId: body.studentIdOld
                    },
                    {
                      studentId: body.studentId,
                      name: body.name,
                      sex: body.sex,
                      age: body.age,
                      major: body.major,
                      class: body.class
                    },
                    function(err, ret) {
                      if (err) {
                        console.log("更新错误！");
                      } else {
                        res.send({ editStudent: true });
                      }
                    }
                  );
                } else {
                  // 班级不存在
                  res.send({ editStudentC: false });
                }
              }
            );
          }
        }
      );
    }
  });
  // 删除学生，注意删除了一个学生，则班级的总人数减一
  router.get("/admin/studentMan", function(req, res) {
    // console.log(req.query);
    Student.deleteOne(
      {
        studentId: req.query.studentId
      },
      function(err, ret) {
        if (err) {
          console.log("删除学生错误");
        } else {
          // console.log("删除学生成功");
          // console.log(ret);
          res.send({ removeStu: true });
          //删除学生成功之后，对应的班级总人数减一
          Class.findOne(
            {
              className: req.query.class,
              major: req.query.major
            },
            function(err, ret) {
              if (err) {
                console.log("查询错误");
              } else {
                // console.log(ret);
                // 删除学生成功之后，对应的班级总人数减一
                ret.count--;
                // 然后把更新的数据保存到class数据表中
                new Class(ret).save(function(err, result) {
                  if (err) {
                    console.log("保存数据到class表中失败");
                  } else {
                    console.log("保存成功！");
                  }
                });
              }
            }
          );
        }
      }
    );
  });
};
