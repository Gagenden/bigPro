<template>
  <div id="pub-job">
    <div id="tiltle">
      <h2 id="title">发布作业</h2>
    </div>
    <div id="contant">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <div class="class">
          <!-- <span>班级：&nbsp;</span> -->
          <el-form-item label="专业班级：" prop="majorClass">
            <el-select v-model="ruleForm.majorClass" placeholder="请选择班级">
              <el-option v-for="item of options" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="作业名称：" prop="jobName">
          <el-input v-model="ruleForm.jobName" class="inputSize" placeholder="请输入作业名称"></el-input>
        </el-form-item>
        <el-form-item label="作业附件：" prop="file">
          <input class="inputSize file" type="file" @change="getFile($event)">
        </el-form-item>
        <el-form-item label="截止时间：" prop="deadLine">
          <el-date-picker v-model="ruleForm.deadLine" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div id="button">
      <el-button type="primary" @click="submitForm('ruleForm',$event)">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择专业班级"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入作业名称"));
      } else {
        callback();
      }
    };
    var validatePass4 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择截止时间"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        jobName: "",
        majorClass: "",
        file: "",
        deadLine: ""
      },
      options: [],
      rules: {
        majorClass: [{ validator: validatePass1, trigger: "change" }],
        jobName: [{ validator: validatePass2, trigger: "change" }],
        deadLine: [{ validator: validatePass4, trigger: "change" }]
      }
    };
  },
  methods: {
    // 取得文件内容
    getFile(event) {
      this.ruleForm.file = event.target.files[0];
      // console.log(this.ruleForm.file);
    },
    //下拉框
    handleChange(value) {
      console.log(value);
    },
    // 点击提交
    submitForm(formName, event) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //校验成功
          this.$confirm("是否发布作业?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(() => {

              //专业班级
              var arr = this.ruleForm.majorClass.split('-');

              event.preventDefault();
              var formData = new FormData();
              formData.append('major', arr[0]);
              formData.append('class', arr[1]);
              formData.append('jobName', this.ruleForm.jobName);
              formData.append('file', this.ruleForm.file);
              formData.append('publishTime', new Date());
              formData.append('deadLine', this.ruleForm.deadLine);
              formData.append('accountNumber', sessionStorage.getItem('teacherName'));

              // 说明数据类型？
              let config = {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              }
              
              // 发起请求
              this.axios.post(this.HOST + '/teacher/publishJob',formData, config).then(result => {
                if(result.data.publishJob == true){
                  this.$message({
                    type: "success",
                    message: "提交成功!"
                  });
                  // 然后清空数据
                  this.ruleForm.jobName = '';
                  this.ruleForm.majorClass = '';
                  this.ruleForm.file = '';
                  this.ruleForm.deadLine = '';
                  // 然后跳转到查看的页面
                  this.$router.push({path: '/teacher/publishJobInfo'})
                }else if(result.data.jib){
                  this.$message({
                    type: "warn",
                    message: "不同的老师，发布的作业名不能相同!"
                  });
                }
              });

             
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "取消发布！"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 点击重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 获取班级信息
    init() {
      this.axios.get(this.HOST + "/teacher/publishJob/getClass").then(ret => {
        // console.log(ret.data);
        for (var i = 0; i < ret.data.length; i++) {
          var arr = ret.data[i].major + "-" + ret.data[i].className;
          this.options.push(arr);
        }
        // console.log(this.options);
      });
    }
  },
  created() {
    this.init();
  }
};
</script>

<style scoped>
#pub-job {
  width: 400px;
  margin: 40px auto;
  color: aliceblue;
  position: relative;
}
#title {
  text-align: center;
  color: aliceblue;
}
.inputName {
  width: 300px;
}
.file {
  font-size: 16px;
  color: black;
}
.uploadFile {
  width: 300px;
  /* height: 40px; */
  font-size: 15px;
}
#upload {
  margin-top: 20px;
  width: 400px;
  font-size: 16px;
  /* background-color: pink; */
}
#upload #con {
  margin-left: 0px;
}

#file {
  color: aliceblue;
  font-size: 16px;
  background-color: aliceblue;
}
#button {
  margin: 20px auto;
  text-align: center;
}
#setClass {
  position: absolute;
  width: 150px;
  top: 42px;
  left: 85px;
}
</style>


