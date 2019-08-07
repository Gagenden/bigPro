//加载包
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//1 连接数据库
//注意：指定连接的数据库不需要存在，当插入第一条数据的时候就会被创建出来
mongoose.connect('mongodb://localhost/Info',{useNewUrlParser:true});
// console.log('数据库连接成功');

//2 设计文档结构（表结构）   公告
var noticeSchema = Schema({
  //标题
  title:{
		type: String,
		require: true  //必须有，不能为空
  },
  // 内容
  content: {
    type: String,
    require: true
  },
  // 发布时间
  publishTime: {
    type: String,
    require: true
  },
});

//3 将文档结构发布为模型

// 直接导出模型构造函数
module.exports = mongoose.model('Notice',noticeSchema);