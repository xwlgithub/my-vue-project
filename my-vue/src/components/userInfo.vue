<template>
  <div >
    <div style="margin-bottom: 2px">
      <el-button  size="small" slot="append"  type="info" @click="showAddDiaLog" v-has="'userAdd'" >新增用户</el-button>
      <el-input
        style="width: 200px;margin-left: 10px"
        placeholder="请输入用户名检索"
        v-model="input"
        clearable >
      </el-input>
      <el-button style="margin-left: 10px" type="info" size="small" slot="append"   icon="el-icon-search" @click="queryUserByName">查询</el-button>
    </div>
    <el-table
    :data="tableData"
    border
    style="width: 100%"
  >
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
      prop="emailAddress"
      label="邮箱">
    </el-table-column>
    <el-table-column
      prop="remark"
      label="备注">
    </el-table-column>
    <el-table-column
      prop="roleName"
      label="角色">
    </el-table-column>
    <el-table-column
      sortable
      prop="createTime"
      label="创建时间">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini" type="success"
          @click="showUserDetails(scope.row)" v-has="'userDetail'">详情</el-button>
        <el-button
          size="mini" type="primary"
          @click="updateUserById(scope.row)" v-has="'userUpdate'">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="deleteUserById(scope.row.id)" v-has="'userDelete'">删除</el-button>
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
        :total="totals"
        :page-size="10"
      >
      </el-pagination>
    </div>
    <div >
      <el-dialog  :title="isAddOrUpdateOrDetails" :visible.sync="dialogFormVisible">
        <el-form :model="UserInfo">
          <el-form-item label="用户名" >
            <el-input :disabled="isDisable" v-model="UserInfo.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" >
            <el-input :disabled="isDisable" v-model="UserInfo.emailAddress" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" >
            <el-input :disabled="isDisable" v-model="UserInfo.remark" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属角色" >
            <el-select  v-model="value" :disabled="isDisable" clearable  placeholder="请分配角色">
              <el-option
                v-for="item in roleNames"
                :key="item.id"
                :label="item.roleName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="userAdd">确 定</el-button>
        </div>
      </el-dialog>
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
          isAddOrUpdateOrDetails:'',
          UserInfo:{
            id:'',
            name:'',
            emailAddress:'',
            remark:'',
            roleId:''
          },
          roleNames:[],
          value:'',
          isDisable:false,
          dialogFormVisible:false
        }
      },
      methods: {
          /*分页查询*/
        findDataList(){
          this.$get("other-server/userList/findUserList?current="+this.current+"&size="+this.size+"&userName="+this.input+"")
            .then(res =>{
              this.totals=res.data.data.total
              this.tableData=res.data.data.seconds
              this.$success(res.data.message)
            })
        },
        /*打开新增窗口*/
        showAddDiaLog(){
          this.value=''
          //获取角色下拉
          this.$get("other-server/roleList/findRoleLists").then(res =>{
            this.roleNames=res.data.data
            console.log(this.roleNames)
          })
          this.isDisable=false
          this.isAddOrUpdateOrDetails='新增'
          // 清空缓存区
          this.UserInfo={
            id:'',
            name:'',
            emailAddress:'',
            remark:'',
            roleId:''
          }
          this.dialogFormVisible=true
        },
        /*添加*/
        userAdd(){
          //this.value=null
          if (this.isDisable){
            return
          }
          this.UserInfo.roleId=this.value
          this.$post("other-server/userList/saveUserByParams",{
           userJson:this.UserInfo
          }).then(res =>{
            console.log(res.data.success)
            if (res.data.success){
              this.$success("操作成功");
            }else {
              this.$fail("操作失败");
            }
          })
          this.dialogFormVisible=false
          this.current=1
          this.findDataList()
        },
        /*详情*/
        showUserDetails(detals){
          this.isDisable=true
          this.isAddOrUpdateOrDetails='详情'
          this.UserInfo=detals
          this.value=detals.roleName
          this.dialogFormVisible=true;
        },
        /*修改*/
        updateUserById(detals){
          this.$get("other-server/roleList/findRoleLists").then(res =>{
            this.roleNames=res.data.data
            console.log(this.roleNames)
          })
          this.isDisable=false
          this.isAddOrUpdateOrDetails='修改'
          //赋值
          this.UserInfo.id=detals.id;
          this.UserInfo.name=detals.name;
          this.UserInfo.remark=detals.remark;
          this.UserInfo.roleId=detals.roleId;
           this.value=detals.roleName;
          this.UserInfo.emailAddress=detals.emailAddress;
          console.log(this.UserInfo)
          this.dialogFormVisible=true;
        },
        deleteUserById(id) {
          this.$post("other-server/userList/deleteUserById/" + id + "")
            .then(res =>{
              let ret=res.data;
              if (ret.success){
                this.$success("删除成功");
              }else {
                this.$fail("删除失败");
              }
              this.findDataList();
            })
          },
        queryUserByName(){
          this.findDataList()

        },
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
