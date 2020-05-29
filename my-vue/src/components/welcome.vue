<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
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
        prop="createTime"
        label="创建时间">
      </el-table-column>
    </el-table>
    <div style=";text-align: right;margin-top: 20px">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
        name: "welcome",
      data() {
        return {
          tableData:[]
        }
      },
      methods: {
       findDataList(){

       }
      }
    }
</script>

<style scoped>

</style>
