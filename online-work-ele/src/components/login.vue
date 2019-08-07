<template>
  	<div class="background">
      <h2>登录界面</h2>
      <div class="outcontent">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="280px" class="demo-ruleForm">
          <el-form-item label="您是:" prop="job">
            <el-radio-group v-model="ruleForm2.job">
              <el-radio label="管理员" name="jobName" value="1"></el-radio>
              <el-radio label="老师" name="jobName" value="2"></el-radio>
              <el-radio label="学生" name="jobName" value="3"></el-radio>
            </el-radio-group>
          </el-form-item>   
          <el-form-item label="账号:" prop="name">
            <el-input type="text" v-model="ruleForm2.name" autocomplete="off" class="inputPas"  placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" autocomplete="off" placeholder="请输入密码" show-password  maxlength=12 class="inputPas"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
            <el-button type="primary" @click="submitForm('ruleForm2')" id="rightBom">登录</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="info">没有账号？</el-button>
            <a href="/register"><el-button type="primary" id="rightBom1">注册</el-button></a>
          </el-form-item>          
        </el-form>
      </div>
	</div>
</template>

<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else{
        callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入您的身份'));
        } else {
          callback();
        }
      };
      return {
        selectedOptions: ['department01'],
        ruleForm2: {
          //默认选中的是学生
          job: "学生",  // 默认是学生
          name: '',
          pass: ''
        },
        rules2: {
          name: [
            { validator: validatePass, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          job: [
            { validator: validatePass3, trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      // render: c => c(student),
      show(value){
        this.stuOrtea = value;
        // console.log('hid' + value);
      },
      hidden(value){
        this.stuOrtea = value;
        // console.log('show' + value);
      },
      handleChange(value) {
        console.log(value);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {//校验成功
          // 现在是直接跳转,以后需要根据身份来跳转
            // this.$router.push({path: '/student'})
            // this.$router.push({path: '/admin'})
            // this.$router.push({path: '/teacher'})
            //第二个参数是一个json数据
            this.axios.post(this.HOST+"/login",{
              job: this.ruleForm2.job,
              name: this.ruleForm2.name,
              password: this.ruleForm2.pass
            })
            .then(result=>{
              // 如果是管理员就跳转到管理员的页面
              console.log(result.data);
              if(this.ruleForm2.job == '管理员'){
                if(result.data.acNum == this.ruleForm2.name){
                  if(result.data.password == this.ruleForm2.pass){
                    // 登录成功之后，设置sessionStroge 账号是唯一的
                    sessionStorage.setItem('adminName',this.ruleForm2.name);
                    this.$router.push({path: '/admin'});
                  }else{   // 否则提示密码不正确
                    alert('管理员密码不正确！请重新输入');
                  }
                }else{
                  alert('该管理员不存在！请重新输入');
                }
              }

              // 如果是教师就跳转到教师的页面
              if(this.ruleForm2.job == '老师'){
                if(result.data.accountNumber == this.ruleForm2.name){
                  if(result.data.password == this.ruleForm2.pass){
                    // 登录成功之后，设置sessionStroge 账号是唯一的
                    sessionStorage.setItem('teacherName',this.ruleForm2.name);
                    this.$router.push({path: '/teacher'});
                  }else{   // 否则提示密码不正确
                    alert('教师密码不正确！请重新输入');
                  }
                }else{
                  alert('该教师不存在！请重新输入');
                }
              }

              // 如果是学生就跳转到学生的页面
              if(this.ruleForm2.job == '学生'){
                if(result.data.studentId == this.ruleForm2.name){
                  if(result.data.password == this.ruleForm2.pass){
                    //登录成功
                    sessionStorage.setItem('studentName',this.ruleForm2.name);
                    this.$router.push( {path: '/student'} );
                  }else{
                    alert('学生密码不正确！请重新输入');
                  }
                }else{
                  alert('该学生不存在！请重新输入');
                }
              }
              
            })
          } else {//校验失败
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created(){
      // this.init();
    }
  }
</script>
  
<style scoped>
  h2 {
    text-align: center;
    margin-top: 50px;
    color: aliceblue;
  }
  .outcontent{
    width: 60%;  
    margin: 50px auto;
  }
  .inputPas {
    width: 300px;
  }
  #rightBom {
    margin-left: 156px;
  }
  #rightBom1 {
    margin-left: 115px;
  }
  #setClass {
    width: 140px;
    margin-top: 20px;
    margin-left: 80px;
  }
 
</style>
