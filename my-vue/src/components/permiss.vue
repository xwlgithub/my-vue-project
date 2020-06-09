<template>
  <div>
    <el-button style="margin-bottom: 5px"  size="small" slot="append" type="primary"  @click="$success('菜单业务后续扩展')" v-has="'menuAdd'" >新增</el-button>
    <!--默认展开default-expand-all-->
    <el-table :highlight-current-row="true"
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'permissionInfoList', hasChildren: 'hasChildren'}"
    >
      <el-table-column
        type="index"
        :index="indexMethod"
      >
      </el-table-column>
      <el-table-column
        label="菜单名称"
        prop="menuName">
      </el-table-column>
      <el-table-column
        label="菜单编号"
        prop="menuCode">
      </el-table-column>
      <el-table-column
        label="菜单路径"
        prop="menuPath">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link v-has="'menuDetail'" type="primary" :underline="false" @click="showDetails(scope.row)"><i class="el-icon-view el-icon--right"></i>详情</el-link>
          <el-link v-has="'menuUpdate'" type="primary" :underline="false" @click="showDetails(scope.row)"><i class="el-icon-edit"></i>编辑</el-link>
          <el-link  v-has="'menuDelete'" type="primary" :underline="false" @click="showDetails(scope.row)"><i class="el-icon-delete"></i>删除</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "permiss",
    data() {
      return {
        tableData: []
        }
    },
    methods: {
      showDetails(row){
          this.$success("菜单业务后续扩展!")
      },
      /*分页查询*/
      findDataList() {
        this.$get("other-server/peron/menuList")
          .then(res => {
            this.tableData=res.data.data
            console.log(this.tableData)
            this.$success("查询成功")
          })
      },
      indexMethod(index) {
        return index == 0 ? 1 : index + 1
      },
    },
    mounted() {
      this.findDataList();
    }
  }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
