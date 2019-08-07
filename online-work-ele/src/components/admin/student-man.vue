<template>
  <div id="student-man">
    <h2>学生信息管理</h2>
    <div id="contant">
      <div id="search">
        <el-autocomplete
          v-model="choiceMajor"
          :fetch-suggestions="querySearch"
          placeholder="请选择或者输入要查找的专业"
          @select="handleSelect"
          @input="searchLike"
          style="width: 220px"
        ></el-autocomplete>
        <el-autocomplete
          v-model="choiceClass"
          :fetch-suggestions="querySearch1"
          placeholder="请选择或者输入要查找的班级"
          @select="handleSelect"
          @input="searchLike"
          style="width: 220px"
        ></el-autocomplete>
        <el-input
          v-model="keywords"
          placeholder="请输入姓名或性别或年龄关键字查找"
          style="width: 263px"
          @input="searchLike"
        ></el-input>
      </div>
      <div>
        <el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" border>
          <el-table-column type="index" label="序号" align="center" width="75px"></el-table-column>
          <el-table-column prop="studentId" label="学号" align="center" fontWight="700"></el-table-column>
          <el-table-column prop="major" label="专业" align="center"></el-table-column>
          <el-table-column prop="class" label="班级" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="sex" label="性别" align="center"></el-table-column>
          <el-table-column prop="age" label="年龄" align="center"></el-table-column>
          <el-table-column prop="password" label="登录密码" align="center"></el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="PageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        ></el-pagination>
      </div>
    </div>
    <div id="read" v-if="showRead">
      <h2>编辑学生</h2>
      <form>
        <label class="label">
          <span>学号：</span>
          <el-input v-model="studentId" :placeholder="inputStudentId" class="inputName"></el-input>
        </label>
        <br>
        <label class="label">
          <span>姓名：</span>
          <el-input v-model="name" :placeholder="inputName" class="inputName"></el-input>
        </label>
        <br>
        <label class="label">
          <span>性别：</span>
          <el-input v-model="sex" :placeholder="inputSex" class="inputName"></el-input>
        </label>
        <br>
        <label class="label">
          <span>年龄：</span>
          <el-input v-model="age" :placeholder="inputAge" class="inputName" type="number"></el-input>
        </label>
        <br>
        <label class="label">
          <span>专业：</span>
          <el-select v-model="major" :placeholder="inputMajor" class="inputName">
            <el-option v-for="item of options1" :key="item" :value="item"></el-option>
          </el-select>
        </label>
        <label class="label">
          <span>班级：</span>
          <el-select v-model="className" :placeholder="inputClass" class="inputName">
            <el-option v-for="item of options2" :key="item" :value="item"></el-option>
          </el-select>
        </label>
        <div id="button">
          <el-button @click="editStudent">提交</el-button>
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
      showRead: "",
      options1: [],
      options2: [],
      majorName: [],
      classNameArray: [],
      keywords: "",
      choiceMajor: "",
      choiceClass: "",
      // 原来的数据
      inputStudentId: "",
      inputName: "",
      inputSex: "",
      inputAge: "",
      inputMajor: "",
      inputClass: "",
      // 修改的数据
      studentId: "",
      name: "",
      sex: "",
      age: "",
      major: "",
      className: "",
      // 总数据
      tableData: [],
      datas: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 5,
      // 个数选择器（可修改）
      pageSizes: [3, 5],
      // 默认每页显示的条数（可修改）
      PageSize: 5
    };
  },
  methods: {
    // 修改学生信息
    handleEdit(index, row) {
      // 对index进行判断
      if (this.currentPage != 1 && this.PageSize == 3) {
        index = (this.currentPage - 1) * this.PageSize + index;
      }
      if (this.currentPage != 1 && this.PageSize == 5) {
        index = (this.currentPage - 1) * this.PageSize + index;
      }

      this.showRead = !this.showRead;
      // 原来的表格数据
      this.inputStudentId = this.tableData[index].studentId;
      this.inputName = this.tableData[index].name;
      this.inputSex = this.tableData[index].sex;
      this.inputAge = this.tableData[index].age;
      this.inputMajor = this.tableData[index].major;
      this.inputClass = this.tableData[index].class;
    },
    editStudent() {
      // 如果没有修改信息，就按照原来的信息
      if (this.studentId == "") {
        this.studentId = this.inputStudentId;
      }
      if (this.name == "") {
        this.name = this.inputName;
      }
      if (this.sex == "") {
        this.sex = this.inputSex;
      }
      if (this.age == "") {
        this.age = this.inputAge;
      }
      if (this.major == "") {
        this.major = this.inputMajor;
      }
      if (this.className == "") {
        this.className = this.inputClass;
      }

      // 发起修改学生的请求
      this.axios
        .post(this.HOST + "/admin/studentMan/edit", {
          // 原来的学号
          studentIdOld: this.inputStudentId,
          majorOld: this.inputMajor,
          classOld: this.inputClass,
          // 修改的数据
          studentId: this.studentId,
          name: this.name,
          sex: this.sex,
          age: this.age,
          major: this.major,
          class: this.className
        })
        .then(ret => {
          console.log(ret.data);
          if (ret.data.editStudent == true) {
            // alert("修改成功！");
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

            // 清空修改的内容
            this.studentId = "";
            this.name = "";
            this.age = "";
            this.sex = "";
            this.major = "";
            this.className = "";

            // 重新渲染数据
            this.init();
          }
          if (ret.data.editStudent == false) {
            // alert("信息未修改，请您继续修改，或退出");
            this.$alert('信息未修改，请您继续修改，或退出！', '来着未来的提示', {
              confirmButtonText: '确定',
              type: "info",
              callback: action => {
                this.$message({
                  type: 'info',
                  message: '已取消！'
                });
              }
            });

            // 清空修改的内容
            this.studentId = "";
            this.name = "";
            this.age = "";
            this.sex = "";
            this.major = "";
            this.className = "";
          }
          if (ret.data.editStudentS == false) {
            // alert("账号已存在，请重新输入学号！");
            this.$alert('账号已存在，请重新输入学号！', '来着未来的提示', {
              confirmButtonText: '确定',
              type: "info"
            });
            // 清空修改的内容
            this.studentId = "";
            this.name = "";
            this.age = "";
            this.sex = "";
            this.major = "";
            this.className = "";
          }
          if (ret.data.editStudentC == false) {
            // alert("班级不存在，请重新选择班级！");
            this.$alert('班级不存在，请重新选择班级！', '来着未来的提示', {
              confirmButtonText: '确定',
              type: "info"
            });

            // 清空修改的内容
            this.studentId = "";
            this.name = "";
            this.age = "";
            this.sex = "";
            this.major = "";
            this.className = "";
          }
        });
    },
    // 删除学生
    handleDelete(index, row) {
      // console.log(row,index);
      this.$confirm("确定删除吗?", "来着未来的提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 对index进行判断

          //第二种情况 显示的不是第一页，并且 默认每页显示的条数为一条
          if (this.currentPage != 1 && this.PageSize == 3) {
            index = (this.currentPage - 1) * this.PageSize + index;
            // console.log(index)
          }
          //第三种种情况 显示的不是第一页，并且 默认每页显示的条数为5条
          if (this.currentPage != 1 && this.PageSize == 5) {
            index = (this.currentPage - 1) * this.PageSize + index;
            // console.log(index)
          }

          // 根据学生账号来删除学生
          // 确认删除之后，发起请求
          this.axios
            .get(this.HOST + "/admin/studentMan", {
              params: {
                studentId: this.tableData[index].studentId,
                class: this.tableData[index].class,
                major: this.tableData[index].major
              }
            })
            .then(result => {
              // console.log(result);
              // console.log('删除成功了')
              if (result.data.removeStu) {
                this.$message({
                  type: "success",
                  message: "已成功删除!"
                });
                if (this.PageSize == 3) {
                  if (
                    index % 3 == 0 &&
                    index != 0 &&
                    index == this.totalCount - 1
                  ) {
                    // 并且是最后一个数据才跳转上一页
                    this.currentPage = this.currentPage - 1;
                    this.init();
                  } else {
                    this.currentPage = this.currentPage;
                    this.init();
                  }
                }
                // 删除第n页的数据，显示第n-1页的数据
                if (this.PageSize == 5) {
                  if (
                    index % 5 == 0 &&
                    index != 0 &&
                    index == this.totalCount - 1
                  ) {
                    this.currentPage = this.currentPage - 1;
                    this.init();
                  } else {
                    this.currentPage = this.currentPage;
                    this.init();
                  }
                }
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
    // 关键字查找
    querySearch(queryString, cb) {
      var jobNameArray = this.majorName;
      var results = queryString
        ? jobNameArray.filter(this.createFilter(queryString))
        : jobNameArray;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    querySearch1(queryString, cb) {
      var jobNameArray = this.classNameArray;
      var results = queryString
        ? jobNameArray.filter(this.createFilter(queryString))
        : jobNameArray;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return jobNameArray => {
        return (
          jobNameArray.value
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      // console.log(item);
    },
    isNull(key) {
      if (key == null || key.length == 0) return true;
      return false;
    },
    searchLike() {
      // 每次查找之前要把 currentPage 改为 第一页
      // 因为查找到的数据要重新排列
      this.currentPage = 1;

      var newList = []; //存放查找到的数据

      var key1 = this.choiceMajor;
      var key2 = this.choiceClass;
      var key3 = this.keywords;
      key1 = key1.replace(/\s+/g,"");
      key2 = key2.replace(/\s+/g,"");
      key3 = key3.replace(/\s+/g,"");
      if (this.isNull(key1) && this.isNull(key2) && this.isNull(key3)) {
        this.init();
      } else if (this.isNull(key2) && this.isNull(key3)) {
        this.datas.forEach(item => {
          //根据专业来查找
          if (item.major.indexOf(key1) != -1) {
            newList.push(item);
          }
        });
        // 查找过后修改总条数
        this.totalCount = newList.length;
        return (this.tableData = newList);
      } else if (this.isNull(key1) && this.isNull(key2)) {
        this.datas.forEach(item => {
          //根据姓名，性别，年龄来查找
          if (
            item.name.indexOf(key3) != -1 ||
            item.sex.indexOf(key3) != -1 ||
            item.age.toString().indexOf(key3) != -1
          ) {
            newList.push(item);
          }
        });
        // 查找过后修改总条数
        this.totalCount = newList.length;
        return (this.tableData = newList);
      } else if (this.isNull(key1) && this.isNull(key3)) {
        this.datas.forEach(item => {
          //根据班级来查找
          if (item.class.indexOf(key2) != -1) {
            newList.push(item);
          }
        });
        // 查找过后修改总条数
        this.totalCount = newList.length;
        return (this.tableData = newList);
      } else if (this.isNull(key1)) {
        this.datas.forEach(item => {
          //根据班级和 姓名、性别、年龄来查找
          if (
            item.class.indexOf(key2) != -1 &&
            (item.name.indexOf(key3) != -1 ||
              item.sex.indexOf(key3) != -1 ||
              item.age.toString().indexOf(key3) != -1)
          ) {
            newList.push(item);
          }
        });
        // 查找过后修改总条数
        this.totalCount = newList.length;
        return (this.tableData = newList);
      } else if (this.isNull(key2)) {
        this.datas.forEach(item => {
          //根据专业和 姓名、性别、年龄来查找
          if (
            item.major.indexOf(key1) != -1 &&
            (item.name.indexOf(key3) != -1 ||
              item.sex.indexOf(key3) != -1 ||
              item.age.toString().indexOf(key3) != -1)
          ) {
            newList.push(item);
          }
        });
        // 查找过后修改总条数
        this.totalCount = newList.length;
        return (this.tableData = newList);
      } else if (this.isNull(key3)) {
        this.datas.forEach(item => {
          //根据班级来查找
          if (
            item.major.indexOf(key1) != -1 &&
            item.class.indexOf(key2) != -1
          ) {
            newList.push(item);
          }
        });
        // 查找过后修改总条数
        this.totalCount = newList.length;
        return (this.tableData = newList);
      } else {
        this.datas.forEach(item => {
          //根据专业、班级和姓名性别年龄来查找
          if (
            item.major.indexOf(key1) != -1 &&
            item.class.indexOf(key2) != -1 &&
            (item.name.indexOf(key3) != -1 ||
              item.sex.indexOf(key3) != -1 ||
              item.age.toString().indexOf(key3) != -1)
          ) {
            newList.push(item);
          }
        });
        // 查找过后修改总条数
        this.totalCount = newList.length;
        return (this.tableData = newList);
      }
    },
    //从数据库中获得数据
    init() {
      this.axios.post(this.HOST + "/admin/studentMan").then(result => {
        // console.log(result.data);
        this.tableData = result.data;
        this.datas = result.data;
        //分页的总体页数
        this.totalCount = result.data.length;
      });
    },
    // 为了绑定修改学生信息中的专业班级
    initMC() {
      this.axios.post(this.HOST + "/admin/studentMan/getMC").then(ret => {
        // 修改学生信息中的专业
        for (var i = 0; i < ret.data.length; i++) {
          // 去重
          if (this.options1.indexOf(ret.data[i].major) == -1) {
            this.options1.push(ret.data[i].major);
          }
        }

        // 赋值
        for (var i = 0; i < this.options1.length; i++) {
          if (this.majorName.indexOf(this.options1[i]) == -1) {
            this.majorName.push({ value: this.options1[i] });
          }
        }
        // 修改学生信息中的班级
        for (var i = 0; i < ret.data.length; i++) {
          //去重
          if (this.options2.indexOf(ret.data[i].className) == -1) {
            this.options2.push(ret.data[i].className);
          }
        }

        // 赋值
        for (var i = 0; i < this.options2.length; i++) {
          if (this.classNameArray.indexOf(this.options2[i]) == -1) {
            this.classNameArray.push({ value: this.options2[i] });
          }
        }
      });
    },
    //实现分页
    // 分页
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
    }
  },
  created() {
    this.init();
    this.initMC();
  }
};
</script>

<style scoped>
h2 {
  color: aliceblue;
  text-align: center;
}
#student-man {
  margin: 40px auto;
  /* background-color: pink; */
}
#contant {
  text-align: center;
  position: relative;
}
#add {
  float: right;
}
#read {
  width: 400px;
  margin: -8px auto;
  /* background-color: pink; */
  background: url("../../assets/bc.jpg");
  position: absolute;
  top: 11px;
  left: 50%;
  margin-left: -103px;
  /* z-index: 100000; */
  color: #606266;
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
  margin-bottom: 6px;
}
</style>
