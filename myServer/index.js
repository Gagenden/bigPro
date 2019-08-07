// 导包
var express = require('express');
var path = require('path');

// 加载body-parser
var bodyParser = require('body-parser');


// 加载router.js文件
var router = require('./router.js');

// 创建服务器应用程序
var app = express();

//开放静态资源
// app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')));
app.use('/submitJob/', express.static(path.join(__dirname, './submitJob/')));
app.use('/publishJob/', express.static(path.join(__dirname, './publishJob/')));
// app.use(express.static(path.join(__dirname,'/submitJob/')));


// 为了在express中获取POST请求体数据
//配置body-parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// 处理跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//配置art-template
app.engine('html', require('express-art-template'));

//把路由器挂载到app服务中
app.use(router);

app.listen('3000', function () {
    console.log('is runing');
})