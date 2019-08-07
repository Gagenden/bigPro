<template>
  <div id="teacher-man">
    <h2>教师信息管理</h2>   
    <div id="search">
      <el-input v-model="keywords" placeholder="请输入账号或者姓名或者年龄或者性别查找" class="inputKey"  @input="search"></el-input>
      <!-- <el-button type="primary" icon="el-icon-search" id="find" @click="search">搜索</el-button> -->
    </div>
    <div id="contant">
      <div>
        <el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" border max-height="300">
          <el-table-column type="index" label="序号" align="center" width="75px"></el-table-column>
          <el-table-column prop="accountNumber" label="账号" align="center" fontWight="700"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="sex" label="性别" align="center"></el-table-column>
          <el-table-column prop="age" label="年龄" align="center"></el-table-column>
          <el-table-column prop="password" label="密码" align="center"></el-table-column>
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
      <h2>编辑</h2>
      <form>
        <label class="label">
          <span>账号：</span>
          <el-input v-model="accountNumber" :placeholder="inputAcNum" class="inputName"></el-input>
        </label><br>
        <label class="label">
          <span>姓名：</span>
          <el-input v-model="name" :placeholder="inputName" class="inputName"></el-input>
        </label><br>
        <label class="label">
          <span>性别：</span>
          <el-input v-model="sex" :placeholder="inputSex" class="inputName"></el-input>         
        </label><br>
        <label class="label">
          <span>年龄：</span>
          <el-input v-model="age" :placeholder="inputAge" class="inputName" type="number"></el-input>
        </label><br>
        <div id="button">
          <el-button @click="editTeacher">提交</el-button>
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
      keywords: '',
      // 修改的信息
      inputAcNum: '',
      inputName: '',
      inputAge: '',
      inputSex: '',
      // 原来的信息
      accountNumber: '',
      name: '',
      sex: '',
      age: '',
      showRead: '',
      tableData: [],
      // 默认显示第几页
      currentPage:1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount:5,
      // 个数选择器（可修改）
      pageSizes:[3, 5],
      // 默认每页显示的条数（可修改）
      PageSize:5,
    }
  },
  methods: {
    // 编辑教师信息
    handleEdit(index,row){
      this.showRead = !this.showRead
      this.inputAcNum = this.tableData[index].accountNumber;
      this.inputName = this.tableData[index].name;
      this.inputSex = this.tableData[index].sex;
      this.inputAge = this.tableData[index].age;
    },
    // 提交修改
    editTeacher(){
      //如果没有修改信息，就按照原来的信息
      if(this.accountNumber == ''){
        this.accountNumber = this.inputAcNum;
      }
      if(this.name == ''){
        this.name = this.inputName;
      }
      if(this.age == ''){
        this.age = this.inputAge;
      }
      if(this.sex == ''){
        this.sex = this.inputSex;
      }

      // 修改老师基本信息
      this.axios.post(this.HOST + '/admin/teacherMan/edit',{
        // 原来的账号
        accountNumberOld: this.inputAcNum,
        // 新数据
        accountNumber: this.accountNumber,
        name: this.name,
        sex: this.sex,
        age: this.age
      }).then(result => {
        // console.log(result.data);
        if(result.data.editTeacher == true || result.data.editTeacherN == true){
          // alert('修改成功！');
          this.$alert('修改成功！', '来着未来的提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: '修改成功！'
                });
              }
            });

          // 隐藏div
          this.showRead = !this.showRead;
          
          // 清空输入的数据
          this.accountNumber = '';
          this.name = '';
          this.sex = '';
          this.age = '';

          this.init();
        } 
        if(result.data.editTeacher == false){
          // alert('信息未修改');
           
          this.$alert('信息未修改，请你继续修改，或退出！', '来着未来的提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: '已退出！'
                });
              }
            });

          // 清空输入的数据
          this.accountNumber = '';
          this.name = '';
          this.sex = '';
          this.age = ''; 
        }
        if(result.data.editTeacherN == false){
          // alert('账号已存在，不可以修改');
          this.$alert('账号已存在，请重新输入账号！', '来着未来的提示', {
            confirmButtonText: '确定',
            type: "info"
          });
          
        }
      })
    },
    // 删除教师
    handleDelete(index, row) {
      this.$confirm('确定删除吗?', '来着未来的提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 对index进行判断
        //第一种情况 显示的不是第一页，并且 默认每页显示的条数为3条
        if(this.currentPage != 1 && this.PageSize == 3){
          // console.log(index);
          index = (this.currentPage - 1) * this.PageSize + index
        }
        //第二种种情况 显示的不是第一页，并且 默认每页显示的条数为5条
        if(this.currentPage != 1 && this.PageSize == 5){
          index = (this.currentPage - 1) * this.PageSize + index
        }
        // 根据教师账号来删除学生
        // 确认删除之后，发起请求
        this.axios.post(this.HOST + '/admin/teacherMan',{
          accountNumber: this.tableData[index].accountNumber  
        }).then(result => {
          console.log(result.data);
          if(result.data.removeTea == true){
            //保证数据及时的刷新
            this.$message({
              type: 'success',
              message: '已成功删除!'
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
            this.init();
          }else{
            this.$message({
              type: 'warn',
              message: '删除失败!'
            });    
          }  
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除!'
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
      if (keywords == null || keywords.length == 0) {
        this.init();
      } else {
        this.tableData.forEach(item => {
          //根据账号、姓名、性别、年龄来查找
          if (
            item.accountNumber.indexOf(keywords) != -1 ||
            item.name.indexOf(keywords) != -1 ||
            item.sex.indexOf(keywords) != -1 ||
            item.age.toString().indexOf(keywords) != -1
           ) {
            newList.push(item);
          }
        });
        // 查找过后修改总条数
        this.totalCount = newList.length;

        return (this.tableData = newList);
      }
    },
    search1() {
      var newList = []; //存放查找到的数据
      var keywords = this.keywords1;
      // console.log(this.keywords)
      // 如果用户输入空格，或者没有输入东西
      if (keywords == null || keywords.length == 0) {
        // return this.tableData;
        // console.log(this.keywords.length);
        this.init();
      } else {
        this.tableData.forEach(item => {
          //根据账号、姓名、性别来查找
          if (item.sex.indexOf(keywords) != -1) {
            newList.push(item);
          }
        });
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
    //从数据库中获得数据
    init(){
      this.axios.get(this.HOST + '/admin/teacherMan').then(result => {
        // console.log(result.data);
        this.tableData = result.data;

        //分页的总体页数
        this.totalCount = result.data.length;
      }) 
    },
  },
  created(){
    this.init();
  }
}
</script>

<style scoped>
  h2 {
    color: aliceblue;
    text-align: center;
  }
  #teacher-man {
    margin: 40px auto;
    /* background-color: pink; */
    position: relative;
  }
  #contant {
   text-align: center;
   position: relative;
  }
  #add {
    float: right;
  }
  #read {
    color: #606266;
    width: 400px;
    margin: -16px auto;
    /* background-color: pink; */
    background: url("../../assets/bc.jpg");
    position: absolute;
    top: 11px;
    left: 50%;
    margin-left: -200px;
    /* z-index: 100000; */
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
  #search {
    width: 400px;
    margin: 0 410px 10px;
    position: relative;
  }
  .inputKey {
    width: 300px;
  }
</style>

