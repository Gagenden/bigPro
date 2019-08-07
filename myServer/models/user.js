//加载包
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//1 连接数据库
//注意：指定连接的数据库不需要存在，当插入第一条数据的时候就会被创建出来
mongoose.connect('mongodb://localhost/Info',{useNewUrlParser:true});
console.log('数据库连接成功');

//2 设计文档结构（表结构）
var userSchema = Schema({
	name:{
		type: String,
		require: true  //必须有，不能为空
	},
	password:{
		type: String,
		require: true
	},
	job: {
		type:String,
		require: true
	}
});

//3 将文档结构发布为模型
//	mongoose.model就是用来将一个架构发布为model的
//	第一个参数：传入一个大写字母，单数字符串，用来表示数据库名称
//				mongoose会自动将大写名称的字符串生成  小写复数 的集合名称
//				 例如这里 User 就会变成 users 集合名称
//	返回值： 模型构造函数：可以对users中的数据进行操作
// 直接导出模型构造函数
module.exports = mongoose.model('User',userSchema);
