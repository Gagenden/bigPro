var express = require('express');

var mongoose = require('mongoose');

var User = require('../models/user');
var Teacher = require('../models/teacher');
var Admin = require('../models/admin');
var Student = require('../models/student');
var Class = require('../models/class');
// 登录页面  处理登录页面的数据
//注意：find方法得到的是一个空数组[],findOne方法得到的是一个空字符串""
var login = function (app) {
	// 处理用户登录的请求
	app.post('/login', function (req, res) {
		// 先判断是哪种身份
		// console.log(req.query);
		if (req.body.job == '管理员') {
			Admin.findOne({
				acNum: req.body.name
			}, function (err, ret) {
				if (err) {
					console.log('查询管理员账号出错');
				} else if (ret != null) { // 说明账号存在
					res.send(ret);
				} else {
					res.send({
						loginAdmin: false
					});
				}
			});
		}
		if (req.body.job == '老师') {
			// 通过老师的账号来判断账号存不存在
			Teacher.findOne({
				accountNumber: req.body.name
			}, function (err, ret) {
				if (err) {
					console.log('查询老师账号出错');
				} else if (ret != null) { // 说明账号存在
					res.send(ret);
				} else {
					res.send({
						loginTeacher: false
					});
				}
			});
		}
		if (req.body.job == '学生') {
			Student.findOne({
				studentId: req.body.name
			}, function (err, ret) {
				if (err) {
					console.log('查询学生，出现错误！');
				} else if (ret != null) {
					res.send(ret);
				} else {
					res.send({
						loginStudent: false
					});
					console.log('学生不存在');
				}
			})
		}
	});
}

module.exports = login;