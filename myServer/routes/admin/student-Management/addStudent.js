var express = require('express');

var mongoose = require('mongoose');

var Student = require('../../../models/student');
var Class = require('../../../models/class');

module.exports = function(router){
  router.post('/admin/addStudent',function(req,res){
   console.log(req.body);
   var student = req.body;
   //先查询这个班级存不存在，不存在则不可以添加学生
   Class.findOne({
     className: student.class,
     major: student.major
   },function(err,ret){
     if(err){
      console.log('查询班级错误！！！');
     }else if(ret == null ){
       //班级不存在，不可以添加
      console.log('班级不存在，不可以添加学生');
      res.send({addStudentC: false});
     }else {
      // 班级存在，可以添加学生 
      //查询有没有相同的学生，根据学号来查找 因为学号是唯一的
        Student.findOne({
        studentId: student.studentId
      },function(err,ret){
        if(err){
          console.log('查询学生错误！！！');
        }else if(ret != null){//ret不为空，说明数据已存在，不可添加
          res.send({addStudentS: false});
        }else {
          //把数据保存进数据库
          if(student.sex == 1){
            student.sex = '男';
          }
          if(student.sex == 2){
            student.sex = '女';
          }
          // console.log(student);
          // 保存到学生表中
          new Student(student).save(function(err,result){
            if(err){
              console.log('保存失败');
              console.log(err);
            }else {
              console.log('保存成功');
              res.send({addStudent: true});
              //保存成功之后，班级表中的对应的班级的人数应该加1；
              Class.findOne({
                major: student.major,
                className: student.class
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
          });
        }
      })
     }
   });
  });
   
  router.get('/admin/addStudent',function(req,res){
    Class.find(function(err,ret){
      if(err){
        console.log('查询班级数据失败');
      }else {
        res.send(ret);
      }
    })
  });
}