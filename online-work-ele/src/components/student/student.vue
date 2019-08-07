<template>
  <div id="student">
    <el-container>
      <el-aside id="aside" width="200px">
        <div id="tiltle"><h2 class="title">学生信息</h2></div>
        <div class="wrap">
          <router-link to="/student/stuInfo"><el-button class="wrap-1">个人信息</el-button></router-link>
          <router-link to="/student/jobInfo"><el-button class="wrap-1">查看作业</el-button></router-link>
          <router-link to="/student/subJob"><el-button class="wrap-1">提交作业</el-button></router-link>
          <router-link to="/student/changePasswordByS"><el-button class="wrap-1">修改密码</el-button></router-link>
          <!-- <el-button class="wrap-1">查看成绩</el-button> -->
          <el-button class="wrap-1" @click="back">注销登录</el-button>  
        </div> 
      </el-aside>
      <el-main id="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'student',
    methods: {
      // 点击了注销登录，回到首页
      back(){
        this.$router.push({path: '/'})
        sessionStorage.clear();   
      }
    }
  }
</script>

<style scoped>
  body, h2 {
    margin: 0;
    padding: 0;
  }
  #aside {
    /* height: 625px; */
    background: url('../../assets/aside.jpg') no-repeat;
     background-size:cover
  }
  #main {
    height: 625px;
    background: url('../../assets/main.jpg') no-repeat;
    background-size: 100%;
  }
  .wrap {
    width: 120px;
    height: 200px;
    margin: 40px auto;
    /* background-color: pink; */
  }
  .wrap-1 {
    width: 90px;
    text-align: center;
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .title {
    text-align: center;
    color: aliceblue;
    margin-top: 20px;
  }

</style>
