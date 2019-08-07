var express = require('express');

var mongoose = require('mongoose');

var Notice = require('../models/notice');

module.exports = function(router){
  router.post('/',function(req,res){
    Notice.find(function(err,result){
      if(err){
        res.send( {noNotice: false} );
      }else{
        res.send(result);
      }
    });
  })
}