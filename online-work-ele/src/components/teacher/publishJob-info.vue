<template>
  <div id="publishJob-info">
    <h2 id="title">发布的作业</h2>
    <div id="main">
      <el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width: 100%" max-height="300" border>
        <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
        
        <el-table-column prop="major" label="专业" width="160" align="center"></el-table-column>
        <el-table-column prop="class" label="班级" width align="center"></el-table-column>
        <el-table-column prop="jobName" label="作业名称" width="200" align="center"></el-table-column>
        <el-table-column prop="file" label="作业附件" width="300" align="center">
          <template slot-scope="scope">
            <a :href="path" @click.prevent="">{{ tableData[scope.$index].file }}</a>
          </template>
        </el-table-column>

        <el-table-column prop="publishTime" label="发布时间" width align="center"></el-table-column>
        <el-table-column prop="deadLine" label="截止时间" width align="center"></el-table-column>
        <el-table-column prop="teacher" label="发布者" width align="center"></el-table-column>
      </el-table>
      <div id="fenye">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage" :page-sizes="pageSizes" :page-size="PageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: '',
      tableData: [
        {
          major: '',
          class: '',
          jobName: '',
          file: '',
          publishTime: '',
          deadLine: '',
          teacher: ''
        }
      ],
      // 默认显示第几页
      currentPage:1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount:5,
      // 个数选择器（可修改）
      pageSizes:[3, 5],
      // 默认每页显示的条数（可修改）
      PageSize:5,
      
    }
  },
  methods: {
    // 实现分页
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数 
      this.PageSize=val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage=1
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage=val
    },
    // 获得
    init(){
      this.axios.post(this.HOST + '/teacher/publishJobInfo',{
        teacherId: sessionStorage.getItem('teacherName')
      }).then(result => {
        // console.log(result.data);
        //分页的总体页数
        this.totalCount = result.data.length;

        this.tableData = result.data;
        // 处理：把拿到的路径修改为作业名字
        for(var i=0; i<result.data.length; i++){
          this.tableData[i].file = result.data[i].file.substring(11);
        }
      })
    }
  },
  created(){
    this.init();
  }
}
</script>

<style scoped>
  #publishJob-info {
    margin: 40px auto;
    color: aliceblue;
  }
  #title {
    text-align: center;
    color: aliceblue;
  }
  a {
    text-decoration: none;
    color: #606266;
  }
  #fenye {
    font-weight: 700;
    margin: 0 350px 0;
  }
</style>

