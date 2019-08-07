//加载包
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//1 连接数据库
mongoose.connect('mongodb://localhost/Info',{useNewUrlParser:true});

//2 设计文档结构（表结构）   学生
var studentSchema = Schema({
  //学号
  studentId: {
    type: String,
    require: true
  },
  // 姓名
  name:{
		type: String,
		require: true  //必须有，不能为空
  },
  // 专业
  major: {
    type:String,
		require: true
  },
  // 班级
  class: {
    type:String,
		require: true
  },
  // 性别
  sex: {
    type: String,
    require: true
  },
  //年龄
  age: {
    type: Number,
    require: true
  },
  //密码
	password: {
		type:String,
		require: true
	}
});

//3 将文档结构发布为模型

// 直接导出模型构造函数
module.exports = mongoose.model('Student',studentSchema);