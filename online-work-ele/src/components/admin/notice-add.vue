<template>
  <div id="notice-add">
    <h2 id="title">公告信息管理</h2>
    <div id="contant">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题：" prop="title">
          <el-input v-model="ruleForm.title" class="inputSize" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容：" prop="content">
          <el-input type="textarea" class="inputSize" :autosize="{ minRows: 4, maxRows: 12}" placeholder="请输入内容" v-model="ruleForm.content">
          </el-input>
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
        callback(new Error('请输入标题'));
      } else {
        callback();
      }
    };
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入内容'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        title: '',
        content: '',
      },
      rules: {
        title: [
          { validator: validatePass, trigger: 'blur' }
        ],
        content: [
          { validator: validatePass1, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) { //校验成功，发起请求
          this.axios.post(this.HOST + '/admin/addNotice',{
            title: this.ruleForm.title,
            content: this.ruleForm.content,
            publishTime: new Date()
          }).then(res => {
            // console.log(res.data);
            if(res.data.addNotice == true){
              alert('添加公告，成功！');
              //然后跳转到查看公告的页面
              this.$router.push({path: '/admin/noticeMan'})
            }else{
              alert('公告已存在，添加失败！');
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
  #notice-add {
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
