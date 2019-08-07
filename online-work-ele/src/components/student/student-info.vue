<template>
  <div id="stu-info">
    <h2>个人信息</h2>
    <div id="contant">
      <el-table :data="tableData" border style="width: 300px">
        <el-table-column prop="name" label="姓名" align="center" fontWight="700"></el-table-column>
        <el-table-column prop="sex" label="性别" align="center"></el-table-column>
        <el-table-column prop="age" label="年龄" align="center"></el-table-column>
      </el-table>
      <el-table :data="tableData" border style="width: 300px; margin-top:15px;">
        <el-table-column prop="major" label="专业" align="center"></el-table-column>
        <el-table-column prop="class" label="班级" align="center"></el-table-column>
      </el-table>
      <el-table :data="tableData" border style="width: 300px; margin-top:15px;" >
        <el-table-column prop="studentId" label="学号" align="center"></el-table-column>
        <el-table-column prop="password" label="密码" align="center"></el-table-column>
      </el-table>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: '',
          sex: '',
          age: '',
          major: '',
          class: '',
          studentId: '',
          password: ''
        }
      ]
    }
  },
  methods: {
    init(){
      this.axios.get(this.HOST + '/student/stuInfo',{
        params: {
          studentId: sessionStorage.getItem('studentName')
        }
      }).then(result => {
        console.log(result.data);
        this.tableData[0].name = result.data.name;
        this.tableData[0].sex = result.data.sex;
        this.tableData[0].age = result.data.age;
        this.tableData[0].studentId = result.data.studentId;
        this.tableData[0].password = result.data.password;
        this.tableData[0].major = result.data.major;
        this.tableData[0].class = result.data.class;
      });
    }
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
  #stu-info {
    width: 300px;
    margin: 40px auto;
    /* background-color: pink; */
  }
  #contant {
   text-align: center;
  }
</style>

