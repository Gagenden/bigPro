<template>
  <div id="tea-info">
    <h2>个人信息</h2>
    <div id="contant">
      <el-table :data="tableData" border style="width: 300px">
        <el-table-column prop="name" label="姓名" align="center" fontWight="700"></el-table-column>
         <el-table-column prop="sex" label="性别" align="center"></el-table-column>
         <el-table-column prop="age" label="年龄" align="center"></el-table-column>
      </el-table>
      <el-table :data="tableData" border style="width: 300px; margin-top:15px;">
        <el-table-column prop="accountNumber" label="账号" align="center"></el-table-column>
        <el-table-column prop="pass" label="登录密码" align="center"></el-table-column>
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
          name: 'sdd',
          sex: '',
          age: '',
          accountNumber: '',
          pass: ''
        }
      ]
    }
  },
  methods: {
    init(){
      this.axios.post(this.HOST + '/teacher/teaInfo',{
        accountNumber: sessionStorage.getItem('teacherName')
      }).then(result => {
        // console.log(result);
        this.tableData[0].name = result.data.name;
        this.tableData[0].sex = result.data.sex;
        this.tableData[0].age = result.data.age;
        this.tableData[0].accountNumber = result.data.accountNumber;
        this.tableData[0].pass = result.data.password;
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
  #tea-info {
    width: 300px;
    margin: 0 auto;
    /* background-color: pink; */
  }
  #contant {
   text-align: center;
  }
</style>

