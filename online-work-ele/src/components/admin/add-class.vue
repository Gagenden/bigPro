<template>
  <div id="addClass">
    <h2 id="title">班级信息管理</h2>
    <div id="contant">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="专业：" prop="inputMajor">
          <el-input v-model="ruleForm.inputMajor" class="inputSize" placeholder="请输入专业名称"></el-input>
        </el-form-item>
        <el-form-item label="班级：" prop="inputClass">
          <el-input v-model="ruleForm.inputClass" class="inputSize" placeholder="请输入班级"></el-input>
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
        callback(new Error('请输入专业名称'));
      } else {
        callback();
      }
    };
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入班级'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        inputMajor: '',
        inputClass: '',
      },
      rules: {
        inputMajor: [
          { validator: validatePass, trigger: 'change' }
        ],
        inputClass: [
          { validator: validatePass1, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) { //校验成功，发起get请求
          this.axios.get(this.HOST+"/admin/addClass",{
              params: {
                major: this.ruleForm.inputMajor,
                className: this.ruleForm.inputClass
              }
          })
          .then(result => {
            // console.log(result);
            if(result.data.addClass){
              //添加成功，跳转到查看班级信息的页面
              //添加班级成功，设置localStorge。专业班级是唯一的
              var majorClass ={
                major:this.ruleForm.inputMajor,
                class:this.ruleForm.inputClass
              }
              // 专业班级
              var str=majorClass.major+majorClass.class;
              window.localStorage.setItem(str,JSON.stringify(majorClass));
              
               
              alert('添加成功！');
              this.$router.push({path: '/admin/classMan'})
            }else {
              alert('班级已存在，不能添加！')
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
}
</script>

<style scoped>
  #addClass {
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
  .inputPas {
    width: 300px;
  }
  #button{
    margin-left: 165px;
  }
</style>
