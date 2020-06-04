<template>
<div>
  <el-collapse   accordion>
    <el-collapse-item  v-for="(item,index) in meanList" :key="index"   :title="item.menuName" >
      <div>
        <el-table
        :data="item.permissionInfoList"
        border
        style="width: 100%">
        <el-table-column
        prop="menuName"
        label="菜单名称"
        width="180">
        </el-table-column>
        <el-table-column
        prop="menuCode"
        label="菜单编号"
        width="180">
        </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini" type="warning" @click="openMenuPointShow(scope.row.id)">菜单按钮查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-collapse-item>
  </el-collapse>
    <el-drawer
      title="我嵌套了表格!"
      :visible.sync="isOpenPoints"
      direction="rtl"
      size="50%">
      <el-table :data="gridData">
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
    </el-drawer>
</div>
</template>

<script>
    export default {
        name: "permiss",
      data(){
        return {
          meanList:[],
          isOpenPoints:false,
          gridData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }],
        }
      },
      methods:{
        openMenuPointShow(id){
          this.$get("other-server/peron/findPointByMenuId/"+id+"").then(res=>{
            console
              .log(res.data)
          })
          //查看当前菜单所属按钮详情集合
          this.isOpenPoints=true
        },
        /*分页查询*/
        findDataList(){
          this.$get("other-server/peron/menuList")
            .then(res =>{
              this.meanList=res.data.data
              console.log(this.meanList)
              this.$success("查询成功")
            })
        },
      },
      mounted(){
          this.findDataList();
      }
    }
</script>

<style scoped>

</style>
