var express = require('express');

var mongoose = require('mongoose');

var Class = require('../../../models/class');

module.exports = function(router){
  router.get('/admin/addClass',function(req,res){
    // res.send({addClass: 'yes'});
    // console.log(req.query);
    var classes = req.query;
    //查询数据库中有没有这个班级
    Class.findOne({
      className: classes.className,
      major: classes.major,
    },function(err,ret){
      // console.log(ret);
      if(err){
        console.log('查询失败');
      }else if( ret != null ){
        //说明班级存在，不可以添加
        res.send({addClass: false});
      }else {
        //说明班级不存在，可以添加,并把数据保存到数据库中。
        res.send({addClass: true});
        new Class(classes).save(function(err,res){
          if(err){
            console.log('保存失败');
          }else {
            console.log('保存成功');
            // console.log(res);
          }
        });
      }
    });
  });
}