var express = require('express');

var mongoose = require('mongoose');

var Notice = require('../../../models/notice');

module.exports = function(router){
  //处理添加公告的请求
  router.post('/admin/addNotice',function(req,res){
    // console.log(req.body);
    
    // 时间处理
    var dt = new Date(req.body.publishTime);
    var y = dt.getFullYear();
		// 使用ES6的padStart方法补0
		var m = (dt.getMonth() + 1).toString().padStart(2,'0');
		var d = dt.getDate().toString().padStart(2,'0');
		var h = dt.getHours().toString().padStart(2,'0');
		var min = dt.getMinutes().toString().padStart(2,'0');
    var s = dt.getSeconds().toString().padStart(2,'0');

    dt = `${y}年${m}月${d}日 ${h}:${min}:${s}`;
    //将处理后的时间赋值给publishTime，然后保存起来
    req.body.publishTime = dt;
    
    //先看看数据库中存不存在改公告，公告的标题是唯一的，根据标题来查询
    Notice.findOne({
      title: req.body.title
    },function(err,ret){
      if(err){
        console.log('查询公告错误！')
      }else if(ret != null){ //说明公告已存在
        res.send( {addNotice: false} );
      }else{
        res.send( {addNotice: true} );
        //可以添加公告了，把数据保存到数据库中
        new Notice(req.body).save(function(err,result){
          if(err){
            console.log('保存数据到公告表中失败！！');
            // console.log(err);
          }else{
            // console.log(result);
            console.log('保存数据到公告表中成功！！');
          }
        });
      }
    })  
  });
};