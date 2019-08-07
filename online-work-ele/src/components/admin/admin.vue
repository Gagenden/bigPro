<template>
  <div id="admin">
    <el-container>
      <el-aside id="aside" width="200px">
        <div id="tiltle"><h2 class="title">管理员</h2></div>
        <div class="wrap">
          <router-link to="/admin/adminInfo"><el-button class="wrap-1">个人信息</el-button></router-link>
          <!-- <router-link to="/admin/classMan"><el-button class="wrap-1">班级管理</el-button></router-link> -->
          <div class="dropdown">
            <el-button class="wrap-1">班级管理</el-button>
            <div class="dropdown-content">
              <router-link to="/admin/classMan"><el-button class="wrap-1">查看信息</el-button></router-link>
              <router-link to="/admin/addClass"><el-button class="wrap-1">添加班级</el-button></router-link>
            </div>
          </div>
          <!-- <router-link to="/admin/teacherMan"><el-button class="wrap-1">老师管理</el-button></router-link> -->
          <div class="dropdown">
            <el-button class="wrap-1">老师管理</el-button>
            <div class="dropdown-content">
              <router-link to="/admin/teacherMan"><el-button class="wrap-1">查看信息</el-button></router-link>
              <router-link to="/admin/addTeacher"><el-button class="wrap-1">添加教师</el-button></router-link>
              <router-link to="/admin/changePassT"><el-button class="wrap-1">修改密码</el-button></router-link>
            </div>
          </div>
          <!-- <router-link to="/admin/studentMan"><el-button class="wrap-1">学生管理</el-button></router-link> -->
          <div class="dropdown">
            <el-button class="wrap-1">学生管理</el-button>
            <div class="dropdown-content">
              <router-link to="/admin/studentMan"><el-button class="wrap-1">查看信息</el-button></router-link>
              <router-link to="/admin/addStudent"><el-button class="wrap-1">添加学生</el-button></router-link>
              <router-link to="/admin/changePassS"><el-button class="wrap-1">修改密码</el-button></router-link>
            </div>
          </div>
          <!-- <router-link to="/admin/noticeAdd"><el-button class="wrap-1">公告信息</el-button></router-link> -->
          <div class="dropdown">
            <el-button class="wrap-1">公告管理</el-button>
            <div class="dropdown-content">
              <router-link to="/admin/noticeMan"><el-button class="wrap-1">查看公告</el-button></router-link>
              <router-link to="/admin/addNotice"><el-button class="wrap-1">添加公告</el-button></router-link>
            </div>
          </div>
          <router-link to="/admin/changePassword"><el-button class="wrap-1">修改密码</el-button></router-link>
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
    data() {
      return {
        activeName: ''
      }
    },
    methods: {
      // 点击了注销登录，回到首页
      back(){
        this.$router.push({path: '/'})
      },
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
    width: 100px;
    text-align: center;
    margin-left: 10px; 
    margin-bottom: 10px;
  }
  .title {
    text-align: center;
    color: aliceblue;
    margin-top: 20px;
  }
  /* 自定义下拉框 */
  .dropdown {
    position: relative;
    display: inline-block;
  }
  .dropdown-content {
    display: none;
    width: 100px;
    text-align: center;
    margin-bottom: 10px;
  }
  .dropdown:hover .dropdown-content {
    display: block;
  }
  /* 自定义下拉框 */

</style>
