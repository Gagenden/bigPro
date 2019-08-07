<template>
  <div id="stu-info">
    <h2>个人信息</h2>
    <div id="contant">
      <el-table :data="tableData" border style="width: 300px">
        <el-table-column prop="name" label="姓名" align="center" fontWight="700"></el-table-column>
        <el-table-column prop="sex" label="性别" align="center"></el-table-column>
        <el-table-column prop="age" label="年龄" align="center"></el-table-column>
      </el-table>
      <el-table :data="tableData" border style="width: 300px; margin-top: 15px;">
        <el-table-column prop="acNum" label="账号" align="center"></el-table-column>
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
          acNum: '',
          password: ''
        }
      ]
    }
  },
  created(){
    // console.log(this.tableData);
    this.axios.get(this.HOST+"/admin/adminInfo",{
      params: {
        acNum: sessionStorage.getItem('adminName')
      }
    }).then(result => {
      console.log(result.data);
      // 有没有简单的传值方法
      this.tableData[0].name = result.data.name;
      this.tableData[0].sex = result.data.sex;
      this.tableData[0].age = result.data.age;
      this.tableData[0].acNum = result.data.acNum;
      this.tableData[0].password = result.data.password;
    });
  }
}
</script>

<style scoped>
  h2 {
    color: aliceblue;
    text-align: center;
    margin-left: 9px;
  }
  #stu-info {
    width: 300px;
    margin: 0px auto;
    /* background-color: pink; */
  }
  #contant {
   text-align: center;
  }
</style>

