<template>
  <div>
    <div style="margin-bottom: 2px">
      <el-button  size="small" slot="append"   type="info">新增用户</el-button>
      <el-input
        style="width: 200px;margin-left: 10px"
        placeholder="请输入用户名检索"
        v-model="input"
        clearable >
      </el-input>
      <el-button style="margin-left: 10px" type="info" size="small" slot="append"   icon="el-icon-search">查询</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        :index="indexMethod"
        label="序号"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="callNum"
        label="联系方式">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="roleId"
        label="角色id">
      </el-table-column>
      <el-table-column
        sortable
        prop="createTime"
        label="创建时间">
      </el-table-column>
    </el-table>
    <div style=";text-align: right;margin-top: 20px">
      <el-pagination
        @size-change="getPageSize"
        @current-change="getCurrent"
        background
        layout="total,sizes,prev, pager, next,jumper"
        :page-sizes="[10, 20, 40, 80,100]"
        :total="totals"
        :page-size="10"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
        name: "userInfo",
      data() {
        return {
          current:'1',
          size:'10',
          tableData:[],
          totals:0,
          input:'',
          UserInfo:{
            id:'',
            name:'',
            callNum:'',
            remark:'',
            roleId:''
          }
        }
      },
      methods: {
          /*分页查询*/
        findDataList(){
          this.$get("other-server/userList/findUserList?current="+this.current+"&size="+this.size+"")
            .then(res =>{
              this.totals=res.data.total
              this.tableData=res.data.seconds
              this.$success("查询成功")
            })
        },
        /*新增*/
        // addUser(){
        //   this.$post("other-server/userList/saveUser")
        // },
        indexMethod(index){
          return index==0?1:index+1
        },
        getPageSize(paegSize) {
          this.size = paegSize;
          this.findDataList()
        },
        getCurrent(current) {
          this.current = current;
          this.findDataList()
        },
      },
      created(){
        this.findDataList();
      }
    }

</script>

<style scoped>

</style>
