<template>
  	<div class="background">
      <h2>注册界面</h2>
      <div class="outcontent">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="280px" class="demo-ruleForm">
          <el-form-item label="身份:" prop="job">
            <el-radio-group v-model="ruleForm2.job">
              <el-radio label="老师" name="jobName" value="1"  @change="hidden"></el-radio>
              <el-radio label="学生" name="jobName" value="2"  @change="show"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 专业 -->
          <!-- <el-form-item label="专业:" prop="inputMajor"  v-if="stuOrtea === '学生'">
            <el-select v-model="ruleForm2.inputMajor" placeholder="请选择专业">
              <el-option v-for="item of options0" :key="item" :value="item"></el-option>
            </el-select>  
          </el-form-item>  -->
          <!-- 班级 -->  
          <!-- <el-form-item label="班级:" prop="inputClass"  v-if="stuOrtea === '学生'">
            <el-select v-model="ruleForm2.inputClass" placeholder="请选择班级">
              <el-option v-for="item of options1" :key="item" :value="item"></el-option>
            </el-select>  
          </el-form-item> -->
          <el-form-item label="姓名:" prop="inputName">
            <el-input v-model="ruleForm2.inputName" class="inputPas" placeholder="请输入姓名"></el-input>
          </el-form-item>  
          <el-form-item label="性别:" prop="inputSex">
            <el-radio-group v-model="ruleForm2.inputSex">
              <el-radio label="男" name="sex" value="1"></el-radio>
              <el-radio label="女" name="sex" value="2"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄:" prop="inputAge" class="demo-ruleForm">
            <el-input v-model="ruleForm2.inputAge" class="inputPas" placeholder="请输入年龄" type="number"></el-input>
          </el-form-item>  
          <el-form-item label="账号:" prop="name">
            <el-input type="text" v-model="ruleForm2.name" autocomplete="off" class="inputPas"  placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" autocomplete="off" placeholder="请输入密码" show-password  maxlength=12 class="inputPas"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off" class="inputPas" placeholder="请再次输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
            <a href="/register" @click.prevent="submitForm('ruleForm2')">
              <el-button type="primary" id="rightBom1">注册</el-button>
            </a>
          </el-form-item>          
        </el-form>
      </div>
      <router-view></router-view>
	</div>
</template>

<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入您的身份'));
        } else{
        callback();
        }
      };
      var validatePass1 = (rule, value, callback) => {
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
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validatePass4 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择专业'));
        } else {
          callback();
        }
      };
      var validatePass5 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择专业'));
        } else {
          callback();
        }
      };
      var validatePass6 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入姓名'));
        } else {
          callback();
        }
      };
      var validatePass7 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入年龄'));
        } else {
          callback();
        }
      };
      return {
        stuOrtea: '',
        options0: [],
        options1: [],
        ruleForm2: {
          //默认选中的学生 
          job: '老师',
          inputMajor: '',
          inputClass: '',
          inputName: '',
          // 默认是男
          inputSex: '男',
          inputAge: '',
          name: '',
          pass: '',
          checkPass: ''
        },
        rules2: {
          job: [
            { validator: validatePass, trigger: 'change' }
          ],
          name: [
            { validator: validatePass1, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass3, trigger: 'blur' }
          ],
          inputMajor: [
            { validator: validatePass4, trigger: 'change'}
          ],
          inputClass: [
            { validator: validatePass5, trigger: 'change'}
          ],
          inputName: [
            { validator: validatePass6, trigger: 'change'}
          ],
          inputAge: [
            { validator: validatePass7, trigger: 'change'}
          ]
        }
      };
    },
    methods: {
      show(value){
        this.stuOrtea = value;
        // console.log('hid' + value);
      },
      hidden(value){
        this.stuOrtea = value;
        // console.log('show' + value);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {//校验成功
            // alert('register');
            this.axios.post(this.HOST+"/register",{
                acNum: this.ruleForm2.name,
                password: this.ruleForm2.pass,
                job: this.ruleForm2.job,
                major: this.ruleForm2.inputMajor,
                class: this.ruleForm2.inputClass,
                sex: this.ruleForm2.inputSex,
                age: this.ruleForm2.inputAge,
                name: this.ruleForm2.inputName
            })
            .then(result=>{
              if(result.data.isRegister){
                // console.log('可以注册')
                //注册成功，跳转到登录页面
                alert('成功注册！！！');
                this.$router.push({path: '/login'})
              }else{
                // console.log('不可以注册，账号已存在')
                // 注册失败，弹框
                 alert('账号已存在！请重新注册');
              }
              console.log(result)
            })
          } else {//校验失败
            console.log('error register!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
        // 从数据库中获得数据
      init(){
        this.axios.get(this.HOST + '/register').then(result => {
          // console.log(result.data);
          // 专业赋值并去重
          for(var i=0; i<result.data.length; i++){
            if(this.options0.indexOf(result.data[i].major) == -1){
              this.options0.push(result.data[i].major);
            }
          }

          // 班级赋值并去重
          for(var i=0; i<result.data.length; i++){
            if(this.options1.indexOf(result.data[i].className) == -1){
              this.options1.push(result.data[i].className);
            }
          }
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
    text-align: center;
    /* margin-top: 50px; */
    color: aliceblue;
  }
  .outcontent{
    font-size: 50px;
    font-weight: 700;
    color: pink;
    width: 60%;  
    margin: 10px auto;
  }
  .classMajor {
    position: relative;
  }
  .inputPas {
    width: 300px;
  }
  #rightBom {
    margin-left: 156px;
  }
  #rightBom1 {
    margin-left: 156px;
  }
  .el-form-item {
    margin-bottom: 20px;
  }
</style>