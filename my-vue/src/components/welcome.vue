<template>
  <div>
    <div>
    <el-carousel :interval="4000" type="card"   height="300px">
      <el-carousel-item v-for="item in imageList" :key="item.id">
        <img style="height: 300px" :src="item.idView" class="image">
      </el-carousel-item>
    </el-carousel>
    </div>
    <div id="main" style="height: 370px; width: 50%;margin-top: 20px;text-align: center;float:left" >
    </div>
    <div style="float:right;margin-top: 20px;height: 370px;width: 45%;">
      <el-card class="box-card">
        <div slot="header" class="clearfix" style="margin-bottom: 2px">
          <span style="font-weight: bolder;font-family: 微软雅黑" >历史留言</span>
          <el-button style="float: right; padding: 3px 0" type="primary" @click="openAddMessage">点击留言</el-button>
        </div>
        <el-table highlight-current-row align="center" :stripe="true"
          ref="filterTable"
          :data="tableData" border height="280"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="姓名"
            width="100"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag disable-transitions >{{scope.row.name}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="message"
            label="留言信息"
            width="250"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag disable-transitions type="success">{{scope.row.message}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                size="mini" type="danger"
                @click="deleById(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <div >
        <el-dialog  title="新增留言" :visible.sync="dialogFormVisible">
          <el-form :model="userMessage">
            <el-form-item label="留言人" >
              <el-input  v-model="userMessage.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="留言信息" >
              <el-input  v-model="userMessage.message" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUserMessage" >确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    </div>
</template>
<script>
  import one from  '../images/1.jpg'
  import two from  '../images/2.jpg'
  import three from  '../images/3.jpg'
  import four from  '../images/4.jpg'
  import five from  '../images/5.jpg'
  import six from  '../images/6.jpg'
  import seven from  '../images/7.jpg'
  import eight from  '../images/8.jpg'
  import nine from  '../images/9.jpg'
    export default {
        name: "welcome",
      data() {
        return {
          tableData:[
          ],
          userMessage:{
            name:'',message:''
          },
          dialogFormVisible:false,
            imageList:[
              {id:0,idView:one},
              {id:1,idView:two},
              {id:2,idView:three},
              {id:3,idView:four},
              {id:4,idView:five},
              {id:5,idView:six},
              {id:6,idView:seven},
              {id:7,idView:eight},
              {id:8,idView:nine},
            ],
          category:[],
          lineData:[],
          barData:[],
          names:'',
          message:''
        }
      },
      methods: {
        drawChart() {
          console.log(this.$echarts.version + "版本");
          //基于准备好的dom，初始化echarts实例
          var myChart = this.$echarts.init(document.getElementById('main'));
// 绘制图表
          var dottedBase = +new Date();
          for (var i = 0; i < 20; i++) {
            var date = new Date(dottedBase += 3600 * 24 * 1000);
            this.category.push([
              date.getFullYear(),
              date.getMonth() + 1,
              date.getDate()
            ].join('-'));
            var b = Math.random() * 200;
            var d = Math.random() * 200;
            this.barData.push(b)
            this.lineData.push(d + b);
          }
          myChart.setOption({
            backgroundColor: '#0f375f',
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: ['line', 'bar'],
              textStyle: {
                color: '#ccc'
              }
            },
            xAxis: {
              data: this.category,
              axisLine: {
                lineStyle: {
                  color: '#ccc'
                }
              }
            },
            yAxis: {
              splitLine: {show: false},
              axisLine: {
                lineStyle: {
                  color: '#ccc'
                }
              }
            },
            series: [{
              name: 'line',
              type: 'line',
              smooth: true,
              showAllSymbol: true,
              symbol: 'emptyCircle',
              symbolSize: 15,
              data: this.lineData
            }, {
              name: 'bar',
              type: 'bar',
              barWidth: 10,
              itemStyle: {
                barBorderRadius: 5,
                color: this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#14c8d4'},
                    {offset: 1, color: '#43eec6'}
                  ]
                )
              },
              data: this.barData
            }, {
              name: 'line',
              type: 'bar',
              barGap: '-100%',
              barWidth: 10,
              itemStyle: {
                color: this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: 'rgba(20,200,212,0.5)'},
                    {offset: 0.2, color: 'rgba(20,200,212,0.2)'},
                    {offset: 1, color: 'rgba(20,200,212,0)'}
                  ]
                )
              },
              z: -12,
              data: this.lineData
            }, {
              name: 'dotted',
              type: 'pictorialBar',
              symbol: 'rect',
              itemStyle: {
                color: '#0f375f'
              },
              symbolRepeat: true,
              symbolSize: [12, 4],
              symbolMargin: 1,
              z: -10,
              data: this.lineData
            }]
          });
        },
        openAddMessage() {
          this.dialogFormVisible = true
        },
        addUserMessage() {
          var name=this.userMessage.name
          var message=this.userMessage.message
          this.$post("show-server/webcome/addUserMessages", {
            name,message
          })
            .then(res => {
                if (res.data.success){
                  this.$success(res.data.message)
                } else {
                  this.$fail(res.data.message)
                }
                this.dialogFormVisible=false
              this.userMessage={}
              this.getList();
              }
            );
        },
        getList(){
          this.$get("show-server/webcome/getUserMessages").then(res=>{
            console.log(res.data.data)
            this.tableData=res.data.data
          })
        },
        deleById(id){
          var id=id;
          this.$post("show-server/webcome/deleteUserMessages?id="+id+""
          ).then(res=>{
            if (res.data.success){
              this.$success(res.data.message)
            } else {
              this.$fail(res.data.message)
            }
            this.getList();
          });
        }
      },
      mounted(){
        this.drawChart();
        this.getList();
        },
      computed(){
        this.getList();
      }
    }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 500px;height: 370px;
    background-color: slategray;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
