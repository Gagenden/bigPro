<template>
  <div id="score">
    <h2 id="title">查看成绩</h2>
    <div id="main">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <div class="class">
          <el-form-item label="专业班级：" prop="majorClass">
            <el-select v-model="ruleForm.majorClass" placeholder="请选择班级">
              <el-option v-for="item1 of options1" :key="item1" :value="item1"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="jobName">
          <el-form-item label="作业名称：" prop="jobName">
            <el-select v-model="ruleForm.jobName" placeholder="请选择作业">
              <el-option v-for="item2 in options2" :key="item2" :value="item2"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <div id="button">
        <el-button type="primary" @click="submitForm('ruleForm',$event)">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </div>
    </div>
    <div id="chart"></div>
    <div id="daochu">
      <el-button type="info" @click="daochuExcel">导出成绩表excel</el-button>
    </div>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

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
    return {
      ruleForm: {
        jobName: "",
        majorClass: ""
      },
      options1: [],
      options2: [],
      title: "",
      rules: {
        majorClass: [{ validator: validatePass1, trigger: "click" }],
        jobName: [{ validator: validatePass2, trigger: "click" }]
      }
    };
  },
  methods: {
    // 点击提交
    submitForm(formName, event) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 获得专业班级
          var arr = this.ruleForm.majorClass.split("-");

          //校验成功
          this.axios
            .post(this.HOST + "/teacher/viewScore", {
              jobName: this.ruleForm.jobName,
              major: arr[0],
              class: arr[1]
            })
            .then(result => {
              // console.log(result.data);
              if (result.data.noJob) {
                alert("不存在该作业");
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById("chart"));
                // 绘制图表
                myChart.setOption({
                  title: {},
                  tooltip: {},
                  xAxis: {
                    data: []
                  },
                  yAxis: {
                    min: 0,
                    max: 100
                  },
                  series: [
                    {
                      name: "成绩",
                      type: "bar",
                      data: []
                    }
                  ]
                });

                // 清空所选的专业班级
                // this.ruleForm.jobName = "";
                // this.ruleForm.majorClass = "";
                return;
              } else if (result.data.noSubmitJob) {
                alert("该作业暂时没有学生提交");
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById("chart"));
                // 绘制图表
                myChart.setOption({
                  title: {},
                  tooltip: {},
                  xAxis: {
                    data: []
                  },
                  yAxis: {
                    min: 0,
                    max: 100
                  },
                  series: [
                    {
                      name: "成绩",
                      type: "bar",
                      data: []
                    }
                  ]
                });

                // 清空所选的专业班级
                // this.ruleForm.jobName = "";
                // this.ruleForm.majorClass = "";
                return;
              } else {
                var student = [];
                for (var i = 0; i < result.data.length; i++) {
                  student.push(result.data[i].student);
                }
                var grades = [];
                for (var i = 0; i < result.data.length; i++) {
                  grades.push(result.data[i].grade);
                }

                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById("chart"));
                // 绘制图表
                myChart.setOption({
                  title: { 
                    text: this.ruleForm.jobName,
                    x: 'center',
                    padding: 20,
                    textStyle: {
                      color: '#606266'
                    } 
                  },
                  tooltip: {},
                  xAxis: {
                    data: student,
                    axisLabel: {
                      interval: 0, //横轴信息全部显示
                      // rotate: -90 // -30度角倾斜显示
                      formatter: function(value){
                        return value.split("").join("\n");
                      }
                    }
                  },
                  yAxis: {
                    min: 0,
                    max: 100
                  },
                  series: [
                    {
                      name: "成绩",
                      type: "bar",
                      data: grades
                    }
                  ]
                });
              }
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
    daochuExcel() {
      this.axios
        .get(this.HOST + "/teacher/viewScore/download", {
          params: {
            jobName: this.ruleForm.jobName,
            major: this.ruleForm.majorClass.split("-")[0],
            class: this.ruleForm.majorClass.split("-")[1]
          }
        })
        .then(result => {
          if (result.data.noJob) {
            alert("不存在这作业！");
          } else if (result.data.noSubmitJob) {
            alert("该作业暂时没有学生提交！");
          } else {
            // 要导出的数据
            var jsonData = [];
            for (var i = 0; i < result.data.length; i++) {
              jsonData.push({
                major: result.data[i].major,
                class: result.data[i].class,
                studentId: result.data[i].studentId,
                student: result.data[i].student,
                grade: result.data[i].grade
              });
            }
            console.log(jsonData);
            //列标题，逗号隔开，每一个逗号就是隔开一个单元格
            let str = `专业,班级,学号,学生,成绩\n`;
            //增加\t为了不让表格显示科学计数法或者其他格式
            for (let i = 0; i < jsonData.length; i++) {
              for (let item in jsonData[i]) {
                str += jsonData[i][item] + "\t,";
              }
              str += "\n";
            }
            //encodeURIComponent解决中文乱码
            let uri =
              "data:text/xls;charset=utf-8,\ufeff" + encodeURIComponent(str);
            //通过创建a标签实现
            let link = document.createElement("a");
            link.href = uri;
            //对下载的文件命名
            link.download =
              this.ruleForm.majorClass + "-" + this.ruleForm.jobName + ".xls";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        });
    },
    // 获得班级，专业，从老师发布的作业表中获得
    init() {
      this.axios
        .post(this.HOST + "/teacher/viewScore/init", {
          teacherId: sessionStorage.getItem("teacherName")
        })
        .then(result => {
          // 专业班级 作业名称
          for (var i = 0; i < result.data.length; i++) {
            var arr1 = result.data[i].major + "-" + result.data[i].class;
            var arr2 = result.data[i].jobName;
            // 去重
            if (this.options1.indexOf(arr1) == -1) {
              this.options1.push(arr1);
            }
            if (this.options2.indexOf(arr2) == -1) {
              this.options2.push(arr2);
            }
          }
        });
    }
  },
  created() {
    this.init();
  }
};
</script>

<style scoped>
#score {
  position: relative;
}
#title {
  text-align: center;
  color: aliceblue;
}
#main {
  position: absolute;
  top: 120px;
  left: 60px;
}
#button {
  margin: 20px 100px 20px;
  text-align: center;
}
#chart {
  height: 400px;
  width: 600px;
  border: 1px solid black;
  position: absolute;
  top: 50px;
  right: 30px;
}
#daochu {
  position: absolute;
  top: 460px;
  right: 260px;
}
</style>


