<template>
  <div id="class-man">
    <h2>班级信息管理</h2>
    <div id="search">
      <el-input v-model="keywords" placeholder="请输入专业或班级关键字查找" class="inputKey"  @input="search"></el-input>
      <!-- <el-button type="primary" icon="el-icon-search" id="find" @click="search">搜索</el-button> -->
    </div>
    <div id="contant">
      <div>
        <el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" border max-height="300">
          <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
          <el-table-column prop="major" label="专业名称" align="center"></el-table-column>
          <el-table-column prop="className" label="班级" align="center"></el-table-column>
          <el-table-column prop="count" label="总人数" align="center"></el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage" :page-sizes="pageSizes" :page-size="PageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    </div>
    <div id="read" v-if="showRead">
      <!-- <router-view></router-view> -->
      <h2>班级信息管理</h2>
      <form>
        <label class="label">
          <span>专业：</span>
          <el-input v-model="major" :placeholder="inputMajor" label="专业" class="inputName"></el-input>
        </label><br>
        <label class="label">
          <span>班级：</span>
          <el-input v-model="className" :placeholder="inputClass" class="inputName"></el-input>
        </label><br>
        <div id="button">
          <el-button @click="editClass">提交</el-button>
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
      major: '', // 修改后的专业
      className: '', // 修改后的班级
      inputMajor: '',
      inputClass: '',
      showRead: "",
      keywords: "",
      tableData: [
        {
          major: "信息与计算科学",
          className: "151班",
          count: "34"
        }
      ],
      // 默认显示第几页
      currentPage:1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 5,
      // 个数选择器（可修改）
      pageSizes:[3, 5],
      // 默认每页显示的条数（可修改）
      PageSize:5,
    };
  },
  methods: {
    
    // 修改班级信息
    handleEdit(index, row) {
      this.showRead = !this.showRead;
      this.inputMajor = this.tableData[index].major;
      this.inputClass = this.tableData[index].className;
    },
    editClass() {
      //如果用户没有修改，就按照原来的专业班级
      if(this.major == ""){
        this.major = this.inputMajor
      }
      if(this.className == ""){
        this.className = this.inputClass
      }
      var str = this.inputMajor + this.inputClass;  // 原来的专业班级
      // console.log(this.major + '+++' + this.className);  // 修改后的班级
      // console.log(str);
      this.axios.post(this.HOST + '/admin/classMan/edit',{
        majorClass: JSON.parse(window.localStorage.getItem(str)),
        major: this.major,
        className: this.className
      }).then(result => {
        if(result.data.editClass == true){
          // alert('修改班级信息成功');
          this.$alert('修改成功！', '来着未来的提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: '修改成功！'
                });
              }
            });
          // 注意：修改成功之后，localStorage应该重新设置
          var majorClass ={
            major:this.major,
            class:this.className
          }
          // 专业班级
          var str=majorClass.major+majorClass.class;
          window.localStorage.setItem(str,JSON.stringify(majorClass));
          
          // 隐藏div
          this.showRead = !this.showRead;

          // 清空输入的
          this.major = '';
          this.className = '';

          this.init();
        }else{
          // alert('该班级已存在，不可以修改')
          this.$alert('该班级已存在，请重新输入班级！', '来着未来的提示', {
            confirmButtonText: '确定',
            type: "info"
          });
           // 隐藏div
          this.showRead = !this.showRead;

          // 清空输入的
          this.major = '';
          this.className = '';
        }
      })
    },
    // 删除班级
    handleDelete(index, row) {
      // console.log(index, row);
      
      // console.log(str);
      this.$confirm("确定删除吗?", "来着未来的提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 对index进行判断
          //第一种情况 显示的不是第一页，并且 默认每页显示的条数为3条
          if(this.currentPage != 1 && this.PageSize == 3){
            console.log(index);
            index = (this.currentPage - 1) * this.PageSize + index
            // console.log(index)
          }
          //第二种种情况 显示的不是第一页，并且 默认每页显示的条数为5条
          if(this.currentPage != 1 && this.PageSize == 5){
            index = (this.currentPage - 1) * this.PageSize + index
            // console.log(index)
          }
          // 根据下表获取值
          var str = this.tableData[index].major + this.tableData[index].className;
          // console.log(str);
          // 确认之后，发起请求
          this.axios.post(this.HOST + "/admin/classMan", {
              majorClass: JSON.parse(window.localStorage.getItem(str))
            })
            .then(result => {
              // console.log(result);
              if(result.data.remove == true){
                this.$message({
                  type: "success",
                  message: "已成功删除!"
                });
                if(this.PageSize == 3){
                  if(index % 3 == 0 && index != 0 && index == this.totalCount-1){  // 并且是最后一个数据才跳转上一页
                    this.currentPage = this.currentPage-1;
                  }else {
                    this.currentPage = this.currentPage;
                  }
                }
                // 删除第n页的数据，显示第n-1页的数据
                if(this.PageSize == 5){
                  if(index % 5 == 0 && index != 0 && index == this.totalCount-1){
                    this.currentPage = this.currentPage-1;
                  }else {
                    this.currentPage = this.currentPage
                  }
                }
                //删除成功之后，清理localStroge
                window.localStorage.removeItem(str);
                this.init();
              }
              
              
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除!"
          });
        });
    },
    //实现关键字查找
    search() {
      // 每次查找之前要把 currentPage 改为 第一页
      // 因为查找到的数据要重新排列
      this.currentPage = 1;

      var newList = []; //存放查找到的数据
      var keywords = this.keywords;
      // console.log(this.keywords)
      // 如果用户输入空格，或者没有输入东西
      if (this.keywords == null || this.keywords.length == 0) {
        // return this.tableData;
        // console.log(this.keywords.length);
        this.init();
      } else {
        this.tableData.forEach(item => {
          //根据专业、班级来查找
          if (
            item.major.indexOf(keywords) != -1 ||
            item.className.indexOf(keywords) != -1
          ) {
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
    init() {
      this.axios.get(this.HOST + "/admin/classMan").then(res => {
        //分页的总体页数
        this.totalCount = res.data.length;

        //这里得到的数据渲染到data中，然后展示出来tableData
        this.tableData = res.data;
      });
    }
  },
  created() {
    this.init();
  }
};
</script>

<style scoped>
h2 {
  color: aliceblue;
  text-align: center;
}
#class-man {
  margin: 40px auto;
  /* background-color: pink; */
  position: relative;
}
#contant {
  text-align: center;
  position: relative;
}
#search {
  width: 400px;
  margin: 0 450px 10px;
  position: relative;
}
#find {
  position: absolute;
  top: 0;
  right: 0;
}
.inputKey {
  width: 220px;
}
#read {
  width: 400px;
  margin: 40px auto;
  /* background-color: pink; */
  background: url("../../assets/bc.jpg");
  position: absolute;
  top: 11px;
  left: 50%;
  margin-left: -200px;
  z-index: 100000;
}
.inputName {
  width: 300px;
  margin: 10px 5px;
}
#button {
  padding: 0 40px 10px 124px;
}
.label {
  width: 365px;
  margin-left: 20px;
}
</style>

