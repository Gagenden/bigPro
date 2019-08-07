//路由模块

//加载包
var express = require('express');

var notice = require('./routes/notice');
var login = require('./routes/login');
var register = require('./routes/register');

var adminInfo = require('./routes/admin/adminInfo');
var changePassword = require('./routes/admin/changePassword');
// 管理班级
var addClass = require('./routes/admin/class-Management/addClass');
var classMan = require('./routes/admin/class-Management/classMan');
// 管理学生
var studentMan = require('./routes/admin/student-Management/studentMan');
var addStudent = require('./routes/admin/student-Management/addStudent');
var changePassS = require('./routes/admin/student-Management/changePassS');
// 教师管理
var teacherMan = require('./routes/admin/teacher-Management/teacherMan');
var addTeacher = require('./routes/admin/teacher-Management/addTeacher');
var changePassT = require('./routes/admin/teacher-Management/changePassT');
//公告管理
var noticeMan = require('./routes/admin/notice-Management/noticeMan');
var addNotice = require('./routes/admin/notice-Management/addNotice');
 
// 查看教师的基本信息  以及修改教师的密码
var teacherInfo = require('./routes/teacher/teacherInfo');
var changePasswordByT = require('./routes/teacher/changePassword');
// 教师查看学生提交的作业  查看成绩
var submitJobInfo = require('./routes/teacher/submitJobInfo');
var viewScore = require('./routes/teacher/viewScore');
// 教师发布作业
var publishJob = require('./routes/teacher/publishJob');
var publishJobInfo = require('./routes/teacher/publishJobInfo');

// 查看学生的基本信息  以及修改密码
var studentInfo = require('./routes/student/studentInfo');
var changePasswordByS = require('./routes/student/changePassword');
// 提交作业  查看老师发布的作业
var submitJob = require('./routes/student/submitJob');
var jobInfo = require('./routes/student/jobInfo');


//创建一个路由容器
var router = express.Router();

// 把路由加载到路由容器中


// 首页---开始
// 登录页面  处理登录页面的数据
login(router);

//注册页面
register(router);

//公告
notice(router);

// 首页---结束

// 管理员--开始

//个人信息
adminInfo(router);
// 修改管理员的密码
changePassword(router);

// 查看班级信息
classMan(router);
//添加管理班级
addClass(router);

//查看学生信息
studentMan(router);
//添加学生
addStudent(router);
// 管理员修改学生密码
changePassS(router);

//查看教师信息
teacherMan(router);
//添加教师
addTeacher(router);
// 管理员修改教师密码
changePassT(router);

// 查看公告信息
noticeMan(router);
//添加公告
addNotice(router);

// 管理员--结束

// 教师--开始

// 查看教师的基本信息
teacherInfo(router);

// 教师修改自己的密码
changePasswordByT(router);

// 教师查看学生提交的作业
submitJobInfo(router);

// 老师查看成绩
viewScore(router);

// 教师发布作业
publishJob(router);

// 查看教师发布的作业
publishJobInfo(router);

// 教师--结束

// 学生--开始

// 查看学生基本信息
studentInfo(router);

// 学生修改自己的密码
changePasswordByS(router);

//学生提交作业
submitJob(router);

// 学生查看作业（老师发布的作业）
jobInfo(router);
// 学生--结束

// 导出
module.exports = router;