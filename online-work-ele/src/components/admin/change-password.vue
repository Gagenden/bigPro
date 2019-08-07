<template>
  <div id="changePass">
    <h2>修改密码</h2> 
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="原密码：" prop="oldPass">
        <el-input type="password" v-model="ruleForm2.oldPass" autocomplete="off" class="inputSize" placeholder="请输入原密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="newPass">
        <el-input type="password" v-model="ruleForm2.newPass" autocomplete="off" class="inputSize"  placeholder="请输入新密码" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off" class="inputSize"  placeholder="请再次输入新密码" show-password></el-input>
      </el-form-item>
      <el-form-item class="button">
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.newPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原密码'));
        }//如果和数据库里的密码不一致，则显示错误  123456 this.ruleForm2.oldPass 要从数据库获取
        else if (value != this.password) {
          callback(new Error('旧密码错误'));
        } else {
          callback();
        }
      };
      return {
        password: '',
        ruleForm2: {
          oldPass: '',
          newPass: '',
          checkPass: '',
        },
        rules2: {
          newPass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          oldPass: [
            { validator: validatePass3, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          //校验通过
          if (valid) {
            this.axios.post(this.HOST + '/admin/changePassword',{
              acNum: sessionStorage.getItem('adminName'),  //管理员账号
              password: this.ruleForm2.newPass    //新密码 
            }).then(result => {
              if(result.data.changePass == true){
                alert('修改密码成功');
                this.$router.push({path: '/admin/adminInfo'})
              }else{
                alert('修改密码失败');
              }
            })
          } else {
            //校验失败
            console.log('error submit!!');
            alert('修改密码失败');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      init(){
        //从数据库中获得原来的密码
        this.axios.get(this.HOST + '/admin/changePassword',{
          params: {
            acNum: sessionStorage.getItem('adminName')
          }
        }).then(result => {
          // console.log(result.data.password);
          this.password = result.data.password
        });
      }
    },
    created(){
      this.init();
    }
  }
</script>

<style scoped>
  #changePass {
    width: 400px;
    margin: 40px auto;
    color: aliceblue;
  }
  h2 {
    text-align: center;
    color: aliceblue;
    margin-left: 90px;
  }
  .inputSize {
    width: 300px;
  }
  .button{
    margin-left: 60px;
  }
</style>
