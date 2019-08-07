var express = require('express');

var mongoose = require('mongoose');

var Teacher = require('../../../models/teacher');

//处理管理员添加教师
module.exports = function(router){
  router.post('/admin/addTeacher',function(req,res){
    //通过的账号唯一性来添加教师
    Teacher.findOne({
      accountNumber: req.body.accountNumber
    },function(err,ret){
      // console.log(ret);
      if(err){
        console.log('查询教师，出现错误！！');
      }else if(ret != null){  //如果查询的结果不为空，说明账号已存在，不可以添加
        res.send( {addTeacher: false} );
      }else {
        res.send( {addTeacher: true} );
        //添加成功之后，把数据保存到数据库  教师表中
        //把数据保存进数据库
        if(req.body.sex == 1){
          req.body.sex = '男';
        }
        if(req.body.sex == 2){
          req.body.sex = '女';
        }
        new Teacher(req.body).save(function(err,ret){
          if(err){
            console.log('保存数据错误');
            // console.log(err);
          }else{
            // console.log(ret);
            console.log('保存数据成功');
          }
        });
      }
    });
  });
}