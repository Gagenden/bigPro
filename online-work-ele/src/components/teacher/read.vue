<template>
  <div id="read">
    <h2 id="title">教师信息管理</h2>
    <div id="contant">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="成绩：" prop="inputGrade">
          <el-input v-model="ruleForm.inputGrade" class="inputSize" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="评阅信息：" prop="inputMsg">
          <el-input v-model="ruleForm.inputMsg" class="inputSize" placeholder="请输入年龄"></el-input>
        </el-form-item> 
        <el-form-item label="评阅时间：" prop="inputTime">
          <el-input v-model="ruleForm.inputTime" class="inputSize" placeholder="请输入年龄"></el-input>
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
        callback(new Error('请输入成绩'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        inputGrade: '',
        inputAge: '',
        inputTime: '',
      },
      rules: {
        inputName: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
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
  #read {
    width: 400px;
    margin: 40px auto;
    background-color: pink;
    position: absolute;
    text-align: center;
    top: -50px;
    left: 50%;
    margin-left: -200px;
  }
  #contant {
    margin: 10px auto;
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
