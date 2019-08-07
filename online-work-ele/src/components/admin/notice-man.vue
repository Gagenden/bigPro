<template>
  <div id="notice-man">
    <h2>公告信息管理</h2> 
    <div id="search">
      <el-input v-model="keywords" placeholder="请输入标题关键字查找" class="inputKey"  @input="search"></el-input>
    </div>  
    <div id="contant">
      <div>
        <el-table :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" border>
           <el-table-column type="index" label="序号" align="center" width="50px"></el-table-column>
          <el-table-column prop="title" label="标题" align="center"></el-table-column>
          <el-table-column prop="content" label="内容" align="center"></el-table-column>
          <el-table-column prop="publishTime" label="发布时间" align="center"></el-table-column>
          <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage" :page-sizes="pageSizes" :page-size="100"
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
      keywords: '',
      tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 5,
      // 个数选择器（可修改）
      pageSizes: [2,5],
      // 默认每页显示的条数（可修改）
      PageSize: 2,
    }
  },
  methods: {
    handleDelete(index, row) {
      this.$confirm('确定删除吗?', '来着未来的提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 对index进行判断
        //第二种情况 显示的不是第一页，并且 默认每页显示的条数为2条
        if(this.currentPage != 1 && this.PageSize == 2){
          index = (this.currentPage - 1) * this.PageSize
          // console.log(index)
        }
        //第二种情况 显示的不是第一页，并且 默认每页显示的条数为5条
        if(this.currentPage != 1 && this.PageSize == 5){
          index = (this.currentPage - 1) * this.PageSize
          // console.log(index)
        }
        // 确认删除之后，发起请求
        // 通过title来删除公告，title是唯一的
        this.axios.get(this.HOST + '/admin/noticeMan',{
          params: {
            title: this.tableData[index].title
          }
        }).then( result => {
          // console.log(result.data);
          if(result.data.removeNotice == true){
            this.$message({
              type: 'success',
              message: '成功删除!'
            });  
            if(this.PageSize == 2){
              if(index % 2 == 0 && index != 0 && index == this.totalCount-1){  // 并且是最后一个数据才跳转上一页
                this.currentPage = this.currentPage-1;
              }else {
                this.currentPage = this.currentPage;
              }
            }
            if(this.PageSize == 5){
              if(index % 5 == 0 && index != 0 && index == this.totalCount-1){  // 并且是最后一个数据才跳转上一页
                this.currentPage = this.currentPage-1;
              }else {
                this.currentPage = this.currentPage;
              }
            }
            this.init();
           
          }else{
            this.$message({
              type: 'info',
              message: '删除失败!'
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除!'
        });          
      });
    },
    //从数据库中获得数据
    init(){
      this.axios.post(this.HOST + '/admin/noticeMan').then(result => {
        this.tableData = result.data;
        this.totalCount = result.data.length;
      }) 
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
    },
    //实现关键字查找
    search() {
      // 每次查找之前要把 currentPage 改为 第一页
      // 因为查找到的数据要重新排列
      this.currentPage = 1;

      var newList = []; //存放查找到的数据
      var keywords = this.keywords;
      // console.log(this.keywords)
      // 如果用户输入空格，或者没有输入东西
      if (this.keywords == null || this.keywords.length == 0) {
        // return this.tableData;
        // console.log(this.keywords.length);
        this.init();
      } else {
        this.tableData.forEach(item => {
          //根据标题来查找
          if (item.title.indexOf(keywords) != -1) {
            newList.push(item);
          }
        });
        // 查找过后修改总条数
        this.totalCount = newList.length;

        return (this.tableData = newList);
      }
      // this.init();
    },
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
  #notice-man {
    margin: 40px auto;
    /* background-color: pink; */
  }
  #contant {
   text-align: center;
   position: relative;
  }
  #add {
    float: right;
  }
  #search {
    width: 400px;
    margin: 0 450px 10px;
    position: relative;
  }
  .inputKey {
    width: 220px;
  }
</style>

