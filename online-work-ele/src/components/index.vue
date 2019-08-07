<template>
  <div id="index">
    <el-container>
      <el-aside id="aside" width="200px">
        <div id="title"><h2 class="title">作业信息管理</h2></div>
        <div class="wrap">
          <router-link to="/"><el-button class="wrap-1">首页</el-button></router-link>
          <router-link to="/login"><el-button class="wrap-1">登录</el-button></router-link>
          <router-link to="/register"><el-button class="wrap-1">注册</el-button></router-link>
          <!-- <router-link to="/"><el-button class="wrap-1">看一看</el-button></router-link>   -->
        </div> 
      </el-aside>
      <el-main id="main">
        <router-view></router-view>
        <div id="title"><h2 class="title">公告信息</h2></div>
        <el-table :data="notice.slice((currentPage-1)*PageSize,currentPage*PageSize)" border >
          <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
          <el-table-column prop="title" label="标题" align="center" fontWight="700"></el-table-column>
         
          <el-table-column prop="content" label="内容" align="center">
            <template slot-scope="scope">
              <a size="mini" @click="showContent(scope.$index, scope.row)" class="overflow">{{ scope.row.content }}</a>
            </template>
          </el-table-column>
        </el-table>  
        <div class="fenye">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-sizes="pageSizes" :page-size="PageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </div>
      </el-main>
    </el-container>
    
    <div id="read" v-if="showRead">
      <el-table :data="tableData" border style="width: 600px">
        <el-table-column prop="title" label="标题" align="center" fontWight="700"></el-table-column>
      </el-table>
      <el-table :data="tableData" border style="width: 600px"  max-height="250">
        <el-table-column prop="content" label="内容" align="center" fontWight="700" ></el-table-column>
      </el-table>
      <el-table :data="tableData" border style="width: 600px">
        <el-table-column prop="publishTime" label="发布时间" align="center" fontWight="700"></el-table-column>
      </el-table>
      <el-button @click="showRead = !showRead" style="width: 600px">退出</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        notice: [],
        showRead: '',
        tableData: [],
        // 默认显示第几页
        currentPage:1,
        // 总条数，根据接口获取数据长度(注意：这里不能为空)
        totalCount:5,
        // 个数选择器（可修改）
        pageSizes:[2, 5],
        // 默认每页显示的条数（可修改）
        PageSize:2,
      }
    },
    methods: {
      init(){
        this.axios.post(this.HOST + '/').then(result => {
          // console.log(result.data);
          this.notice = result.data;

          this.totalCount = result.data.length;
        });
      },
      showContent(index,row){
        console.log(row)
        this.showRead = !this.showRead;

        this.tableData[0] = row; 

      },
      //实现分页
      // 分页
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
      }
    },
    created(){
      this.init();
    }
  }
</script>

<style scoped>
  .overflow {
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  body, h2 {
    margin: 0;
    padding: 0;
  }
  h2 {
    color: aliceblue;
    text-align: center;
  }
  #index {
    position: relative;
  }
  #aside {
    height: 625px;
    background: url('../assets/aside.jpg') no-repeat;
     background-size:cover
  }
  #main {
    height: 625px;
    background: url('../assets/main.jpg') no-repeat;
    background-size: 100%;
  }
  .wrap {
    width: 120px;
    height: 200px;
    margin: 40px auto;
    /* background-color: pink; */
  }
  .wrap-1 {
    width: 90px;
    text-align: center;
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .title {
    text-align: center;
    color: aliceblue;
    margin-top: 20px;
  }
  #title {
    margin-bottom: 20px;
  }
  #read {
    width: 600px;
    margin: 40px auto;
    /* background-color: pink; */
    background: url("../assets/main.jpg");
    position: absolute;
    top: 2px;
    left: 50%;
    margin-left: -200px;
    z-index: 100000;
  }
  .fenye {
    margin-left: 350px;
  }
  #overflow {
    background-color: pink;
  }
</style>


