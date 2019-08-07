<template>
  <div id="addTeacher">
    <h2 id="title">教师信息管理</h2>
    <div id="contant">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名：" prop="inputName">
          <el-input v-model="ruleForm.inputName" class="inputSize" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="inputSex">
          <el-radio-group v-model="ruleForm.inputSex">
            <el-radio :label="1" name="sex" value="1">男</el-radio>
            <el-radio :label="2" name="sex" value="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄：" prop="inputAge">
          <el-input v-model="ruleForm.inputAge" class="inputSize" placeholder="请输入年龄" type="number"></el-input>
        </el-form-item>    
        <el-form-item label="账号：" prop="inputNum">
          <el-input v-model="ruleForm.inputNum" class="inputSize" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="inputPass">
          <el-input v-model="ruleForm.inputPass" class="inputSize" show-password placeholder="请输入密码"></el-input>
        </el-form-item> 
        <el-form-item label="确认密码：" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" class="inputSize"  placeholder="请再次输入新密码" show-password></el-input>
        </el-form-item>
      </el-form>
    </div> 
    <div id="button">
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入姓名'));
      } else {
        callback();
      }
    };
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入性别'));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入年龄'));
      } else {
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        callback();
      }
    };
    var validatePass4 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
     var validatePass5 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.inputPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      ruleForm: {
        inputName: '',
        inputNum: '',
        //默认是女
        inputSex: 2,
        inputAge: '',
        inputPass: '',
        checkPass: ''
      },
      rules: {
        inputName: [
          { validator: validatePass, trigger: 'blur' }
        ],
        inputSex: [
          { validator: validatePass1, trigger: 'change' }
        ],
        inputAge: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        inputNum: [
          { validator: validatePass3, trigger: 'blur' }
        ],
        inputPass: [
          { validator: validatePass4, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass5, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) { //校验通过
          this.axios.post(this.HOST + '/admin/addTeacher',{
            accountNumber: this.ruleForm.inputNum,
            name: this.ruleForm.inputName,
            sex: this.ruleForm.inputSex,
            age: this.ruleForm.inputAge,
            password: this.ruleForm.inputPass
          }).then(result => {
            if(result.data.addTeacher == true){
              alert('添加成功！');
              this.$router.push({path: '/admin/teacherMan'})
            }else{
              alert('账号已存在，添加失败！');
              this.$router.push({path: '/admin/addTeacher'});
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
  #addTeacher {
    width: 400px;
    margin: 40px auto;
    color: aliceblue;
  }
  .inputSize {
    width: 300px;
  }
  h2 {
    text-align: center;
    color: aliceblue;
    margin-left: 90px;
  }
  #button{
    margin-left: 156px;
  }
</style>
