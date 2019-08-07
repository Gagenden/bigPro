<template>
  <div id="sub-job">
    <div id="tiltle"><h2 id="title">作业提交</h2></div>
      <form action="">
        <label>
          <span>作业名称：</span>
          <!-- <el-input v-model="jobName" id="jobName" placeholder="请输入作业名称" class="inputName"></el-input> -->
          <el-select v-model="jobName" placeholder="请选择要提交的作业">
            <el-option v-for="item of options" :key="item" :value="item"></el-option>
          </el-select>
        </label>
        <div id="upload">
          <div id="con">
            <span>上传作业：</span>
            <input type="file" class="uploadFile" @change="getFile($event)">
          </div>
          <div id="button">
            <el-button @click="submitForm($event)">提交</el-button>
            <el-button @click='exit'>退出</el-button>
          </div>
        </div>
         
      </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        jobName: '',
        file: '',
        // 作业名称，与老师输入的一致
        options: '',
      }
    },
    methods: {
      getFile(event) {
        this.file = event.target.files[0];
        // console.log(this.file);
      },
      submitForm(event) {
        // 如果作业名字空，提交失败
        if(this.jobName == '' ){
          this.$message({
            showClose: true,
            duration: 1500,
            type: 'warning',
            message: '请选择作业名称！'
          })
          // alert('请选择作业名称！');
          return
        }
        // 如果作业附件为空，提交失败
        if(this.file == ''){
          this.$message({
            showClose: true,
            duration: 1500,
            type: 'warning',
            message: '作业不能为空！'
          })
          return
        }
        this.$confirm('是否提交作业?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          // 上传文件
          event.preventDefault();
          var formData = new FormData();
          formData.append('jobName', this.jobName);
          formData.append('file', this.file);
          formData.append('studentId', sessionStorage.getItem('studentName'));
          // console.log(new Date());
          formData.append('submitTime', new Date());

          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          // 获得对应作业的截止时间,先判断时间。
          this.axios.post(this.HOST + '/student/subJob/getDeadLine',{
            jobName: this.jobName
          }).then(ret => {
            // console.log(formData.submitTime);
            var now = this.timeHandle(new Date());
            var cut = ret.data.deadLine;
            var arr1 = now.split('.');
            var arr2 = cut.split('.');
            // console.log(arr1);
            // console.log(now+ 'ff' + cut);
            if(arr1[0] > arr2[0]){
              // alert('超过了截止时间，不可以提交');
              this.$message({
                type: 'warning',
                message: '超过了截止时间，不可以提交！'
              })
              this.jobName = '';
              this.file = '';
              return
            }else if(arr1[1] > arr2[1]){
              // alert('超过了截止时间，不可以提交');
              this.$message({
                type: 'warning',
                message: '超过了截止时间，不可以提交！'
              })
              this.jobName = '';
              this.file = '';
              return
            }else if(arr1[2] > arr2[2]){
              // alert('超过了截止时间，不可以提交');
              this.$message({
                type: 'warning',
                message: '超过了截止时间，不可以提交！'
              })
              this.jobName = '';
              this.file = '';
              return
            }else{
              // console.log('可以提交了')
              // 作业不能重复提交，只能提交一次
              this.axios.post(this.HOST + '/student/subJob/getState',{
                jobName: this.jobName,
                studentId: sessionStorage.getItem('studentName')
              }).then(result => {
                if(result.data.submitJobState){
                   // 上传作业
                  this.axios.post(this.HOST + '/student/subJob', formData, config).then(result => {
                    if(result.data.submitJob == true){
                      this.$message({
                        type: 'info',
                        duration: 1500,
                        message: '提交成功！'
                      })
                      // 跳转到查看作业的页面
                      this.$router.push({path: '/student/jobInfo'})
                      
                      this.jobName = '';
                      this.file = '';
                    }
                  });
                }else{
                  this.$message({
                    type: 'info',
                    message: '作业已提交过，不能再提交了！'
                  });
                }
              })
             
            }
          });
              
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '提交失败！'
          });          
        });
        
      },
      exit(){
        this.$router.push({path: '/student/jobInfo'})
      },
      // 获得作业名称
      init(){
        this.axios.post(this.HOST + '/student/subJob/getJobName',{
          studentId: sessionStorage.getItem('studentName')
        }).then(result => {
          var jobName = [];
          for(var i=0; i<result.data.length; i++){
            jobName.push(result.data[i].jobName);
          }
          this.options = jobName;
        })
      },
      // 处理时间
      timeHandle(dt){
        var y = dt.getFullYear();
        // 使用ES6的padStart方法补0
        var m = (dt.getMonth() + 1).toString().padStart(2, '0');
        var d = dt.getDate().toString().padStart(2, '0');
        dt = `${y}.${m}.${d}`;
        return dt;
      }
     
      
    },
    created(){
      this.init();
    }
  }
</script>

<style scoped>
  #sub-job {
    width: 400px;
    margin: 40px auto;
    color: aliceblue;
  }
  #title {
    text-align: center;
    color: aliceblue;
  }
  .inputName {
    width: 300px;
  }
  .uploadFile {
    /* width: 300px; */
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
  
</style>


