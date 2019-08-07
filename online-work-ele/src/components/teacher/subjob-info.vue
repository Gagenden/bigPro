<template>
  <div id="subjob-info">
    <h2>作业信息</h2>
    <div id="search">
      <el-autocomplete v-model="keywords" :fetch-suggestions="querySearch"
        placeholder="请选择作业或者输入学生名字进行查找" @select="handleSelect" class="inputKey" @input="search"></el-autocomplete>
      <!-- <el-button type="primary" icon="el-icon-search" id="find" @click="search">搜索</el-button> -->
    </div>
    <div id="main">
      <el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
        <el-table-column prop="jobName" label="作业名称" width align="center"></el-table-column>
        <el-table-column prop="file" label="作业附件" width="240" align="center">
          <template slot-scope="scope">
            <a
              :href="path"
              @click="download(scope.$index, scope.row)"
            >{{ scope.row.file }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="submitTime" label="提交时间" width align="center"></el-table-column>
        <el-table-column prop="student" label="提交学生" width align="center"></el-table-column>
        <el-table-column prop="comment" label="评阅信息" width align="center"></el-table-column>
        <el-table-column prop="grade" label="成绩" width align="center"></el-table-column>
        <el-table-column prop="commentTime" label="评阅时间" width align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <!-- <router-link to="/teacher/subjobInfo/read"><el-button size="mini" @click="showRead = !showRead">评阅</el-button></router-link> -->
          <!-- <el-button size="mini" @click="showRead = !showRead">评阅</el-button> -->
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="commentA(scope.$index, scope.row)">评阅</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="currentPage" :page-sizes="pageSizes" :page-size="PageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </div>
    <div id="read" v-if="showRead">
      <!-- <router-view></router-view> -->
      <h2>评阅作业</h2>
      <form action="/teacher/subjobInfo">
        <label class="label">
          <span>评阅成绩：</span>
          <el-input
            v-model="grade"
            id="grade"
            placeholder="请输入成绩(0---100)"
            class="inputName"
            type="number"
          ></el-input>
        </label>
        <br>
        <label class="label">
          <span>评阅信息：</span>
          <el-input v-model="comment" id="comment" placeholder="请输入评阅信息" class="inputName"></el-input>
        </label>
        <br>

        <div id="button">
          <el-button @click="commentJob">提交</el-button>
          <el-button native-type="reset">重置</el-button>
          <el-button @click="showRead = !showRead">退出</el-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: "",
      showRead: "",
      rows: "",
      comment: "",
      grade: "",
      commentTime: "",
      tableData: [],
      keywords: "",
      jobNameArray: [],
      // 默认显示第几页
      currentPage:1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount:5,
      // 个数选择器（可修改）
      pageSizes:[3, 5],
      // 默认每页显示的条数（可修改）
      PageSize:5,
    };
  },

  methods: {
    // 下载学生提交的作业
    download(index, rows) {
      // 注意：这里要把路径补充完整
      var str = rows.file; // 路径是唯一的
      this.path = "http://localhost:3000/submitJob/" + str;
    },
    // 点击评阅
    commentA(index, rows) {
      this.showRead = !this.showRead;
      return (this.rows = rows);
    },
    // 提交评论弹框
    commentJob() {
      if (this.grade == "") {
        this.$message({
          type: "warning",
          message: "成绩不能为空!"
        });
        this.grade == "";
        return;
      }
      this.$confirm("是否评阅?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.axios
            .post(this.HOST + "/teacher/subjobInfo/comment", {
              jobName: this.rows.jobName,
              file: this.rows.file,
              studentId: this.rows.studentId,
              grade: this.grade,
              comment: this.comment,
              commentTime: this.timeHandle(new Date())
            })
            .then(result => {
              if (result.data.comment == true) {
                this.$message({
                  type: "info",
                  message: "评阅成功！"
                });
                this.init();
                this.showRead = !this.showRead;
                this.grade = "";
                this.comment = "";
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "提交失败！"
          });
        });
    },
    // 关键字查找
    querySearch(queryString, cb) {
      var jobNameArray = this.jobNameArray;
      var results = queryString ? jobNameArray.filter(this.createFilter(queryString)) : jobNameArray;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (jobNameArray) => {
        return (jobNameArray.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      // console.log(item);
    },
    search() {
      this.currentPage = 1;
      
      var newList = []; //存放查找到的数据
      var keywords = this.keywords;
      // 如果用户输入空格，或者没有输入东西
      if (this.keywords == null || this.keywords.length == 0) {
        this.init();
      } else {
        this.tableData.forEach(item => {
          //根据作业名称、学生来查找
          if (item.jobName.indexOf(keywords) != -1 || item.student.indexOf(keywords) != -1) {
            newList.push(item);
          }
        });
       
         // 查找过后修改总条数
        this.totalCount = newList.length;
        
        return (this.tableData = newList);
      }
      // this.init();
    },
    //实现分页
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数 
      this.PageSize=val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage=1
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage=val
    },
    // 初始化数据，从数据库中获得学生提交的作业信息
    init() {
     
      this.axios
        .get(this.HOST + "/teacher/subjobInfo", {
          params: {
            teacherId: sessionStorage.getItem("teacherName")
          }
        })
        .then(result => {
          //分页的总体页数
          this.totalCount = result.data.length;

          this.tableData = result.data;
  
          for (var i = 0; i < result.data.length; i++) {
            this.tableData[i].file = result.data[i].file.substring(10);
          }
        });
    },
    // 获得作业名称
    getJObName(){
       this.axios
        .get(this.HOST + "/teacher/subjobInfo/getJobName", {
          params: {
            teacherId: sessionStorage.getItem("teacherName")
          }
        })
        .then(result => {
          // console.log(result.data)
          // 作业名称
          var array = [];
          // 先去重
          for(var i=0; i<result.data.length; i++){
            if(array.indexOf(result.data[i].jobName) == -1){
              array.push(result.data[i].jobName);
            }
          }

          // 再赋值
          for(var i=0; i< array.length; i++){
            if(this.jobNameArray.indexOf(array[i]) == -1){
              this.jobNameArray.push( { 'value':array[i] } );
            }
          }
          
        });
    },
    // 处理时间
    timeHandle(dt) {
      var y = dt.getFullYear();
      // 使用ES6的padStart方法补0
      var m = (dt.getMonth() + 1).toString().padStart(2, "0");
      var d = dt
        .getDate()
        .toString()
        .padStart(2, "0");
      dt = `${y}.${m}.${d}`;
      return dt;
    }
  },
  created() {
    this.init();
    this.getJObName();
  }
};
</script>

<style scoped>
h2 {
  color: aliceblue;
  text-align: center;
}
#subjob-info {
  margin: 0 auto;
  position: relative;
}
#main {
  text-align: center;
}
#read {
  color: #606266;
  width: 400px;
  margin: -40px auto;
  /* background-color: pink; */
  background: url("../../assets/bc.jpg");
  position: absolute;
  top: 11px;
  left: 50%;
  margin-left: -200px;
  /* z-index: 100000; */
}
.label {
  margin-left: 5px;
}
#title {
  text-align: center;
  color: aliceblue;
}
.inputName {
  width: 300px;
  margin: 10px 5px;
}
#button {
  padding: 0 40px 10px 89px;
}
a {
  text-decoration: none;
  color: #606266;
}
#search {
  width: 400px;
  margin: 0 420px 10px;
  position: relative;
}
#find {
  position: absolute;
  top: 0;
  right: 0;
}
.inputKey {
  width: 300px;
}
</style>
