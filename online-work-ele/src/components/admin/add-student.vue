<template>
  <div id="add-student">
    <h2 id="title">学生信息管理</h2>
    <div id="contant">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="major">
          <!-- <span>专业：&nbsp;</span> -->
          <el-form-item label="专业：" prop="inputMajor">
            <el-select v-model="ruleForm.inputMajor" placeholder="请选择专业">
              <el-option v-for="item of options" :key="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>  
        </div>
        <div class="major">
          <!-- <span>班级：&nbsp;</span> -->
          <el-form-item label="班级：" prop="inputClass">
            <el-select v-model="ruleForm.inputClass" placeholder="请选择班级">
              <el-option v-for="item of options1" :key="item" :value="item">
              </el-option>
            </el-select>  
          </el-form-item>  
        </div>
        <el-form-item label="学号：" prop="inputNum">
          <el-input v-model="ruleForm.inputNum" class="inputSize" placeholder="请输入学号"></el-input>
        </el-form-item>  
        <el-form-item label="姓名：" prop="inputName">
          <el-input v-model="ruleForm.inputName" class="inputSize" placeholder="请输入姓名"></el-input>
        </el-form-item>  
        <el-form-item label="性别：" prop="inputSex">
          <el-radio-group v-model="ruleForm.inputSex">
            <el-radio :label="1" name="sex" value="男">男</el-radio>
            <el-radio :label="2" name="sex" value="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄：" prop="inputAge">
          <el-input v-model="ruleForm.inputAge" class="inputSize" placeholder="请输入年龄" type="number"></el-input>
        </el-form-item>  
        <el-form-item label="登录密码：" prop="inputPass">
          <el-input v-model="ruleForm.inputPass" class="inputSize" placeholder="请输入密码"></el-input>
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
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入学号'));
      } else {
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入姓名'));
      } else {
        callback();
      }
    };
    var validatePass4 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入性别'));
      } else {
        callback();
      }
    };
    var validatePass5 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入年龄'));
      } else {
        callback();
      }
    };
    var validatePass6 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      options: [],
      options1: [],
      ruleForm: {
        inputMajor: '',
        inputClass: '',
        inputNum: '',
        inputName: '',
        //默认是女
        inputSex: 2,
        inputAge: '',
        inputPass: ''
      },
      rules: {
        inputMajor: [
          { validator: validatePass, trigger: 'change' }
        ],
        inputClass: [
          { validator: validatePass1, trigger: 'change' }
        ],
        inputNum: [
          { validator: validatePass2, trigger: 'blur'}
        ],
        inputName: [
          { validator: validatePass3, trigger: 'blur'}
        ],
        inputSex: [
          { validator: validatePass4, trigger: 'blur'}
        ],
        inputAge: [
          { validator: validatePass5, trigger: 'blur'}
        ],
        inputPass: [
          { validator: validatePass6, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) { //校验成功
          this.axios.post(this.HOST + '/admin/addStudent',{
            studentId: this.ruleForm.inputNum,
            name: this.ruleForm.inputName,
            major: this.ruleForm.inputMajor,
            class: this.ruleForm.inputClass,
            sex: this.ruleForm.inputSex,
            age: this.ruleForm.inputAge,
            password: this.ruleForm.inputPass
          }).then(result => {
            // console.log(result.data);
            if(result.data.addStudent == true){
              alert('添加成功！');
              // this.$alert('添加成功！', '来着未来的提示', {
              //   confirmButtonText: '确定',
              //   type: "info"
              // });
              
              this.$router.push({path: '/admin/studentMan'})
            }
            if(result.data.addStudentC == false) {
              // alert('添加失败！班级不存在！');
              this.$alert('添加失败！班级不存在！', '来着未来的提示', {
                confirmButtonText: '确定',
                type: "info"
              });
            }
            if(result.data.addStudentS == false){
              // alert('添加失败！学号已存在！');
              this.$alert('添加失败！学号已存在！', '来着未来的提示', {
                confirmButtonText: '确定',
                type: "info"
              });
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
  created(){
    //为了绑定专业
    this.axios.get(this.HOST + '/admin/addStudent').then(res => {
      //专业
      for(var i=0; i<res.data.length; i++){
        // 去重
        if(this.options.indexOf(res.data[i].major) == -1){
          this.options.push(res.data[i].major);
        }
      }
    });
    // 为了绑定班级
    this.axios.get(this.HOST + '/admin/addStudent').then(res => {
      // 班级
      for(var i=0; i<res.data.length; i++){
        //去重 
        if(this.options1.indexOf(res.data[i].className) == -1){
          this.options1.push(res.data[i].className);
        }
      }
    });
  }
}
</script>

<style scoped>
  #add-student {
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
  .major {
    margin-left: 1px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #606266;
  }
</style>

