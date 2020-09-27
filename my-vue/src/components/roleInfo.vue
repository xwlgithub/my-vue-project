<template>
  <div>
    <div style="margin-bottom: 2px">
      <el-button size="small" slot="append" type="info" @click="roleAddisShow" v-has="'roleAdd'">新增角色</el-button>
      <el-input
        style="width: 200px;margin-left: 10px"
        placeholder="请输入角色名检索"
        v-model="input"
        clearable>
      </el-input>
      <el-button style="margin-left: 10px" type="info" size="small" slot="append" icon="el-icon-search"
                 @click="showDataList">查询
      </el-button>
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
            size="mini" type="warning" @click="showDisTree(scope.row.id)" v-has="'roleWithMenu'"
          >分配权限
          </el-button>
          <el-button
            size="mini" type="success" @click="showDetails(scope.row)" v-has="'roleDetail'"
          >详情
          </el-button>
          <el-button
            size="mini" type="primary" @click="updateRole(scope.row)" v-has="'roleUpdate'"
          >编辑
          </el-button>
          <el-button
            size="mini"
            type="danger" @click="deleteRoleById(scope.row.id)" v-has="'roleDelete'"
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
    <el-dialog
      title="分配权限"
      :visible.sync="centerDialogVisible"
      default-expand-all
      width="30%"
      center>
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        ref="tree"
        highlight-current
        default-expand-all
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitTree">确 定</el-button>
  </span>
    </el-dialog>
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
        totals: 0,
        isDisable: false,
        roleInfo: {
          roleName: '',
          remark: ''
        },
        input: '',
        dialogFormVisible: false,
        centerDialogVisible: false,
        isAddOrUpdateOrDetails: '',
        treeData: [],
        menuTreeDataShow: [],//菜单回显列表
        roleId:'',
        deleteds:[]
      }
    },
    methods: {
      submitTree() {
        //获取角色id
        var roleNowId=this.roleId
        //获得当前选中节点``  选取子节点和父节点ID放同一数组里
        var roleIds= this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
        var permissIds=roleIds.join(",")
        const contains = (() =>
            Array.prototype.includes
              ? (arr, value) => permissIds.includes(value)
              : (arr, value) => permissIds.some((el => el === value))
        )();
        console.log("当前选中节点"+permissIds)
        this.deleteds=[]
        //获取最先渲染菜单集合
        let showIds=this.menuTreeDataShow;
        var demo=''
        for (let i = 0; i < showIds.length; i++) {
          if (!contains(showIds[i].id)){
            console.log("包含"+contains(showIds[i].id))
            demo+=showIds[i].id+',';
            this.deleteds[i]=showIds[i].id
          }
        }
        console.log("要删除的"+demo)
        var mydeleteds=demo.substring(0,demo.length-1)
        console.log("要删除的ID集合"+mydeleteds)
        this.$post("other-server/roleList/saveRoleWithMenuByIds?permissIds="+permissIds+",&" +
          "roleId="+roleNowId+"&mydeleteds="+mydeleteds+"").then(res =>{
            if (res.data.success){
              this.$success(res.data.message)
            }else {
              this.$fail(res.data.message)
            }
        })
        this.centerDialogVisible = false
      },
      showDisTree(id) {
        this.roleId=id
        /*获取权限菜单树形体*/
        this.$get("other-server/peron/treeMenus").then(res => {
          this.treeData = res.data.data
        })
        this.centerDialogVisible = true
        /*如果当前角色存在权限信息,即回显*/
        this.$get("other-server/roleList/findRoleMenuListById/" + id + "").then(res => {
          this.menuTreeDataShow = res.data.data;
          this.$refs.tree.setCheckedNodes(this.menuTreeDataShow)
        })
      },
      /*修改*/
      updateRole(detals) {
        this.isDisable = false
        this.isAddOrUpdateOrDetails = '修改'
        //赋值
        this.roleInfo.id = detals.id;
        this.roleInfo.roleName = detals.roleName;
        this.roleInfo.remark = detals.remark;
        this.dialogFormVisible = true;
      },
      /*详情*/
      showDetails(details) {
        this.isDisable = true
        this.isAddOrUpdateOrDetails = '详情'
        this.roleInfo = details
        this.dialogFormVisible = true;
      },
      /*新增窗口打开*/
      roleAddisShow() {
        this.isDisable = false
        this.roleInfo = {
          roleName: '',
          remark: ''
        }
        this.isAddOrUpdateOrDetails = "新增"
        this.dialogFormVisible = true;
      },
      showDataList() {
        this.findDataList()
      },
      /*删除*/
      deleteRoleById(id) {
        this.$post("other-server/roleList/deleteRoleById/" + id + "").then(res => {
          let ret = res.data;
          if (ret.success) {
            this.$success("删除成功");
          } else {
            this.$fail(res.message);
          }
          this.findDataList();
        })
      },
      /*分页查询*/
      findDataList() {
        this.$get("other-server/roleList/findRoleList?current=" + this.current + "&size=" + this.size + "&roleName=" + this.input + "")
          .then(res => {
            this.totals = res.data.data.total
            this.tableData = res.data.data.seconds
            this.$success("查询成功")
          })
      },
      roleAdd() {
        if (this.isDisable) {
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
        this.roleInfo = {
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
    },
    computed(){
      this.findDataList()
    }
  }
</script>

<style scoped>

</style>
