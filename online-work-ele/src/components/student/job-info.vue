<template>
  <div id="job-info">
     <h2>查看作业</h2>
     <div id="main">
        <el-table :data="tableData" style="width: 100%" max-height='280' @filter-change="handleFilterChange">
           <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
          <el-table-column prop="jobName" label="作业名称" width="180" align="center"></el-table-column>
          <el-table-column prop="file" label="作业附件" width="300" align="center"></el-table-column>
          <!-- <el-table-column prop="jobTime" label="发布时间" width="180" align="center"></el-table-column> -->
          <el-table-column prop="deadLine" label="截止时间" width="180" align="center">
          </el-table-column>
          <el-table-column prop="teacher" label="发布老师" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <a :href="path" @click="download(scope.$index, scope.row)">下载</a>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="状态" width="180" align="center"
            :filters="[{ text: '未完成', value: '未完成' }, { text: '完成', value: '完成' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-button :type="scope.row.state == '完成' ? 'primary' : 'success'" size=mini @click="show(scope.$index, scope.row.state)">{{scope.row.state}}</el-button>
              </template>
              
          </el-table-column>
          
        </el-table>
     </div>
     <div id="read" v-if="showRead">
        <h2>查看成绩</h2>
        <!-- <i class="el-icon-circle-close-outline exit" @click="exit"></i> -->
        <el-button icon="el-icon-circle-close-outline" size="mini" class="exit" @click="exit"></el-button>
        <div id="readCon">
          <el-table :data="tableData1" border style="width: 300px">
            <el-table-column prop="grade" label="成绩" align="center" fontWight="700"></el-table-column>
          </el-table>
          <el-table :data="tableData1" border style="width: 300px">
            <el-table-column prop="readMsg" label="老师点评" align="center"></el-table-column>
          </el-table>
          <el-table :data="tableData1" border style="width: 300px">
            <el-table-column prop="readTime" label="点评时间" align="center"></el-table-column>
          </el-table>
        </div>

     </div>
  </div>  
</template>

<script>
export default {
  data() {
    return {
      path: '',
      showRead: '',
      tableData: [
        {
          jobName: '',
          file: '',
          deadLine: '',
          teacher: '',
          // 默认都是未完成的
          state: '未完成'
        }
      ],
      tableData1: [
        {
          grade: '80',
          readMsg: '完成的不错，有自己的想法',
          readTime: '2019.3.31'
        }
      ]
    }
  },

  methods: {
    // 下载老师发布的作业
    download(index, rows) {
      // 注意：这里要把路径补充完整
      var str = this.tableData[index].file; // 路径是唯一的
      this.path = "http://localhost:3000/publishJob/" + str;
    },
    filterTag(value, row) {
      return row.state === value;
    },
    handleFilterChange(){
      console.log('筛选变化了');
    },
    show(index,row) {
      if(row == '完成'){
        this.showRead = !this.showRead;
        this.axios.post(this.HOST + '/student/jobInfo/getComment',{
          jobName: this.tableData[index].jobName,
          studentId: sessionStorage.getItem('studentName')
        }).then(result => {
          // console.log(result.data.comment == '');
          if(result.data.comment == ''){
            this.tableData1[0].readMsg = '未点评！';
          }else{
            this.tableData1[0].readMsg = result.data.comment; 
          }
          this.tableData1[0].grade = result.data.grade;
          this.tableData1[0].readTime = result.data.commentTime
        });
      }else {
        alert('作业未完成,请加油');
      }
    },
    exit() {
      this.showRead = !this.showRead;
      // this.showRead = 'false';
    },
    init() {
      // 获得老师发布的作业信息,要对应班级信息
      this.axios.post(this.HOST + '/student/jobInfo/getPublishJob',{
        studentId: sessionStorage.getItem('studentName')
      }).then(result => {
        // console.log(result.data);
        this.tableData = result.data;
        // 获得作业附件名称
       
        for(var i=0; i<result.data.length; i++){
          this.tableData[i].file = result.data[i].file.substring(11);
          this.axios.post(this.HOST + '/student/jobInfo/getState',{
            studentId: sessionStorage.getItem('studentName'),
            jobName: this.tableData[i].jobName,
            index: i
          }).then(result => {
            // console.log(result.data)
            if(result.data[1] != null){
              // console.log(this.tableData[result.data[0].index].state);
              this.tableData[result.data[0].index].state = result.data[1].state
            }else{
              this.tableData[result.data[0].index].state = '未完成';
            }
          });
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
    color: aliceblue;
    text-align: center;
  }
  #job-info {
    margin: 40px auto;
  }
  #main {
   text-align: center;
  }
  #read {
    width: 400px;
    margin: 40px auto;
    /* background-color: pink; */
    background: url('../../assets/bc.jpg');
    position: absolute;
    top: 10px;
    left: 50%;
    margin-left: -110px;
    z-index: 10000;
  }
  #readCon {
    width: 250px;
    margin: 0 auto;
  }
  .exit {
    position: absolute;
    top: 0;
    right: 0;
    size: 50px;
  }
  a {
    text-decoration: none;
    color: #606266;
  }
</style>
