//加载包
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//1 连接数据库
//注意：指定连接的数据库不需要存在，当插入第一条数据的时候就会被创建出来
mongoose.connect('mongodb://localhost/Info',{useNewUrlParser:true});
// console.log('数据库连接成功');

//2 设计文档结构（表结构）   提交的作业
var submitJobSchema = Schema({
  // 作业名称
  jobName:{
		type: String,
		require: true  //必须有，不能为空
  },
  // 作业附件的地址
  file:{
    type: String,
    require: true
  },
  // 提交学生
  student: {
    type:String,
    require: true
  },
  major: {
    type:String,
    require: true
  },
  class: {
    type:String,
    require: true
  },
  studentId: {
    type: String
  },
  teacherId: {
    type: String
  },
  // 提交时间
  submitTime: {
    type: String,
    require: true
  },
  // 点评
  comment: {
    type: String
  },
  // 成绩
  grade: {
    type: Number
  },
  // 评阅时间
  commentTime: {
    type: String
  },
  state: {
    type: String,
    default: '未完成'
  }
});

//3 将文档结构发布为模型

// 直接导出模型构造函数
module.exports = mongoose.model('SubmitJob',submitJobSchema);