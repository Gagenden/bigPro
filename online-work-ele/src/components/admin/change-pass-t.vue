<template>
  <div id="changePass">
    <h2>修改密码</h2> 
    <!-- 根据老师账号修改密码 -->
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="教师账号：" prop="accountNumber">
        <el-select v-model="ruleForm2.accountNumber" placeholder="请选择教师账号">
          <el-option v-for="item of options" :key="item" :value="item"></el-option>
        </el-select>
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
          callback(new Error('请输入教师账号'));
        }
        else {
          callback();
        }
      };
      return {
        options: [],
        ruleForm2: {
          num: '',
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
          num: [
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
            this.axios.post(this.HOST + '/admin/changePassT',{
              accountNumber: this.ruleForm2.accountNumber,
              newPass: this.ruleForm2.newPass
            }).then( res => {
              if(res.data.changePasswordT == true){
                alert('修改密码成功');
                // 修改密码成功之后跳转
                this.$router.push({path: '/admin/teacherMan'})
              }else {
                alert('修改失败');
              }
            })
          } else {
            //校验失败
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      bindTeacherId(){
        this.axios.get(this.HOST + '/admin/changePassT').then(res => {
          //教师账号
          for(var i=0; i<res.data.length; i++){
            //因为账号是唯一的，所以不需要去重
            this.options.push(res.data[i].accountNumber);
          }
        });
      }
    },
    created(){
      this.bindTeacherId();
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