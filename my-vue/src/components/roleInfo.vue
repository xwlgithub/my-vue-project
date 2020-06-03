<template>
  <div>
    <div style="margin-bottom: 2px">
      <el-button size="small" slot="append" type="info" @click="roleAddisShow">新增角色</el-button>
      <el-input
        style="width: 200px;margin-left: 10px"
        placeholder="请输入角色名检索"
        v-model="input"
        clearable>
      </el-input>
      <el-button style="margin-left: 10px" type="info" size="small" slot="append" icon="el-icon-search" @click="showDataList">查询</el-button>
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="roleName"
        label="角色名">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini" type="warning"
          >分配权限
          </el-button>
          <el-button
            size="mini" type="success" @click="showDetails(scope.row)"
          >详情
          </el-button>
          <el-button
            size="mini" type="primary" @click="updateRole(scope.row)"
          >编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"  @click="deleteRoleById(scope.row.id)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style=";text-align: right;margin-top: 20px">
      <el-pagination
        @size-change="getPageSize"
        @current-change="getCurrent"
        background
        layout="total,sizes,prev, pager, next,jumper"
        :page-sizes="[10, 20, 40, 80,100]"
        :total='totals'
        :page-size="10"
      >
      </el-pagination>
    </div>
    <div>
      <el-dialog :title="isAddOrUpdateOrDetails" :visible.sync="dialogFormVisible">
        <el-form :model="roleInfo">
          <el-form-item label="角色名称">
            <el-input :disabled="isDisable" v-model="roleInfo.roleName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input :disabled="isDisable" v-model="roleInfo.remark" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="roleAdd">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "roleInfo",
    data() {
      return {
        tableData: [],
        current: 1,
        size: 10,
        totals:0,
        isDisable:false,
        roleInfo: {
          roleName: '',
          remark: ''
        },
        input: '',
        dialogFormVisible: false,
        isAddOrUpdateOrDetails:''
      }
    },
    methods: {
      updateRole(detals){
        this.isDisable=false
        this.isAddOrUpdateOrDetails='修改'
        //赋值
        this.roleInfo.id=detals.id;
        this.roleInfo.roleName=detals.roleName;
        this.roleInfo.remark=detals.remark;
        this.dialogFormVisible=true;
      },
      showDetails(details){
        /*详情*/
        this.isDisable=true
          this.isAddOrUpdateOrDetails='详情'
          this.roleInfo=details
          this.dialogFormVisible=true;
      },
      roleAddisShow() {
        this.isDisable=false
        this.roleInfo={
          roleName: '',
          remark: ''
        }
        this.isAddOrUpdateOrDetails="新增"
        this.dialogFormVisible = true;
      },
      showDataList(){
        this.findDataList()
      },
      deleteRoleById(id){
        this.$post("other-server/roleList/deleteRoleById/"+id+"").then(res=>{
          let ret=res.data;
          if (ret.success){
            this.$success("删除成功");
          }else {
            this.$fail(res.message);
          }
          this.findDataList();
        })
      },
      /*分页查询*/
      findDataList(){
        this.$get("other-server/roleList/findRoleList?current="+this.current+"&size="+this.size+"&roleName="+this.input+"")
          .then(res =>{
            this.totals=res.data.data.total
            this.tableData=res.data.data.seconds
            this.$success("查询成功")
          })
      },
      roleAdd() {
        if (this.isDisable){
          return
        }
        this.$post("other-server/roleList/saveRoleByParams",
          {
            roleJson: this.roleInfo
          }).then(res => {
          console.log(res.data.success)
          if (res.data.success) {
            this.$success("操作成功");
          } else {
            this.$fail(res.data.message);
          }
        })
        this.dialogFormVisible = false
        this.roleInfo={
          roleName: '',
          remark: ''
        }
        this.findDataList()
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
    created() {
      this.findDataList()
    }
  }
</script>

<style scoped>

</style>
