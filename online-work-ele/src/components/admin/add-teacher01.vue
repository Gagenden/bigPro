<template>
  <div id="addTeacher">
    <h2 id="title">教师信息管理</h2>
    <div id="contant">
      <label for="">
        <span>姓名： </span><el-input v-model="inputName" placeholder="请输入姓名" class="inputT"></el-input>
      </label><br>
      <label for="">
        <span>账号：</span>
        <el-input v-model="inputNum" placeholder="请输入账号" class="inputT"></el-input>
      </label><br>
      <label for="" class="sex">
        <span>性别：&nbsp;&nbsp;</span>
        <el-radio v-model="inputSex" label="1">男</el-radio>
        <el-radio v-model="inputSex" label="2">女</el-radio>    
      </label><br>
      <label for="">
        年龄：
        <el-input v-model="inputAge" placeholder="请输入年龄" class="inputT"></el-input>        
      </label><br>
      <label for="">
        密码：
        <el-input v-model="inputPass" placeholder="请输入密码"  show-password class="inputT"></el-input>
      </label><br>
    </div>
    <div id="button">
            <el-button >提交</el-button>
            <el-button native-type="reset">重置</el-button>
          </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      inputName: '',
      inputNum: '',
      inputSex: '1',
      inputAge: '',
      inputPass: ''
    }
  }
}
</script>

<style>
  #addTeacher {
    width: 400px;
    margin: 40px auto;
    color: aliceblue;
  }
  #title {
    text-align: center;
  }
  .inputT {
    width: 300px;
    margin-top: 10px;
  }
  .sex {
    margin-left: 0px;
    margin-top: 10px;
  }
  #button {
    margin: 10px auto;
    text-align: center;
  }
</style>

