<template>
  <div>
    <div style="margin-bottom: 2px">
      <el-button size="small" slot="append" type="success" @click="showAddlsp" v-has="'threeAddlsp'">新增三字母</el-button>
    </div>
    <el-table
      ref="filterTable"
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
        prop="lspName"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="coorDinate"
        label="坐标">
      </el-table-column>
      <el-table-column
        prop="salary"
        label="薪资范围">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="isHaveNarcissistic"
        label="自恋">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.isHaveNarcissistic === 1 ? 'danger' : 'info'"
            disable-transitions>{{scope.row.isHaveNarcissistic===1?'自恋':'不自恋'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="isHavePicture"
        label="偷怕">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.isHavePicture === 1 ? 'danger' : 'info'"
            disable-transitions>{{scope.row.isHavePicture===1?'偷拍':'不偷拍'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别">
        <template slot-scope="scope">
          <el-tag
            effect="dark"
            :type="scope.row.sex === 1 ? 'success' : 'warning'"
            disable-transitions>{{scope.row.sex===1?'男':'女'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="traffic"
        label="交通">
      </el-table-column>
      <el-table-column
        prop="girlFriend"
        label="女友">
      </el-table-column>
      <el-table-column
        prop="room"
        label="几套房">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="喝茶"
        width="100"
        :filters="[{ text: '喝茶', value: 1 }, { text: '不喝', value: 0 }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === 1 ? 'primary' : 'success'"
            disable-transitions>{{scope.row.tag===1?'喝茶':'不喝'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        width="500">
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="280">
        <template slot-scope="scope">
          <el-button
            size="mini" type="success"
            @click="showLspDetails(scope.row)" v-has="'threeDetaillsp'">详情
          </el-button>
          <el-button
            size="mini" type="primary"
            @click="updateLspById(scope.row)" v-has="'threeUpdatelsp'">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteLspById(scope.row.id)" v-has="'threeDeletelsp'">删除
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
        :total="totals"
        :page-size="10"
      >
      </el-pagination>
    </div>
    <div>
      <el-dialog :close-on-click-modal=false :close-on-press-escape=false :title="isAddOrUpdateOrDetails" :visible.sync="dialogFormVisible">
        <el-form :model="lspInfo" :inline="true" >
          <el-form-item label="姓名">
            <el-input size="medium" :disabled="isDisable" v-model="lspInfo.lspName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="坐标">
            <el-input size="medium" :disabled="isDisable" v-model="lspInfo.coorDinate" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="薪资">
            <el-input size="medium" :disabled="isDisable" v-model="lspInfo.salary" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input size="medium" :disabled="isDisable" v-model="lspInfo.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="自恋">
            <el-select size="medium"  v-model="isHaveNarcissisticsValue" :disabled="isDisable" clearable  placeholder="是否自恋">
              <el-option
                v-for="item in isHaveNarcissisticss"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="偷拍">
            <el-select size="medium"  v-model="isHavePictureValue" :disabled="isDisable" clearable  placeholder="是否偷拍">
            <el-option
              v-for="item in isHaveNarcissisticss"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option></el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-select size="medium"  v-model="sexs" :disabled="isDisable" clearable  placeholder="请选择性别">
              <el-option
                v-for="item in isSex"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option></el-select>
        </el-form-item>
          <el-form-item label="喝茶">
            <el-select size="medium"  v-model="seas" :disabled="isDisable" clearable  placeholder="是否喝茶">
              <el-option
                v-for="item in isHaveNarcissisticss"
                :key="item.id"
                :label="item.value"
                :value="item.id">
              </el-option></el-select>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input size="medium" :disabled="isDisable" v-model="lspInfo.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="交通">
            <el-input size="medium" :disabled="isDisable" v-model="lspInfo.traffic" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="女友数">
            <el-input size="medium" :disabled="isDisable" v-model="lspInfo.girlFriend" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="房产数">
            <el-input size="medium" :disabled="isDisable" v-model="lspInfo.room" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" >
            <div style="width: 500px">
              <el-input  type="textarea"
                      :rows="5" :disabled="isDisable" v-model="lspInfo.remark" autocomplete="off">

              </el-input>
              </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="lspSure">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "threeletter",
    data() {
      return {
        current: '1',
        size: '10',
        isHaveNarcissisticss:[{"id":1,"value":"是"},{"id":0,"value":"否"}],
        isSex:[{"id":1,"value":"男"},{"id":0,"value":"女"}],
        isHaveNarcissisticsValue:'',
        isHavePictureValue:'',
        sexs:'',
        seas:'',
        tableData: [],
        totals:0,
        isAddOrUpdateOrDetails: '',
        dialogFormVisible: false,
        lspInfo: {
          lspName: '',
          email: '',
          coorDinate:'',
          salary:'',
          age:'',
          isHaveNarcissistic:'',
          isHavePicture:'',
          sex:'',
          tag:'',
          traffic:'',
          girlFriend:'',
          room:'',
          remark: ''
        },
        put:'',
        isDisable: false
      }
    },
    methods: {
      filterTag(value, row) {
        console.log(value+row)
        return row.tag === value;
      },
      /*弹出框*/
      showAddlsp() {
        this.seas=''
        this.sexs=''
        this.isHavePictureValue=''
        this.isHaveNarcissisticsValue=''
        this.lspInfo={}
        this.isDisable=false
        this.isAddOrUpdateOrDetails = '新增'
        this.dialogFormVisible = true
      },
      /*详情*/
      showLspDetails(detail) {
        this.isAddOrUpdateOrDetails = '详情'
        this.isDisable = true
        this.dialogFormVisible = true
        console.log(detail)
        this.isHaveNarcissisticsValue=detail.isHaveNarcissistic
        this.isHavePictureValue=detail.isHavePicture
        this.sexs=detail.sex
        this.seas=detail.tag
        this.lspInfo = detail
      },
      /*编辑*/
      updateLspById(detail) {
        this.isAddOrUpdateOrDetails = '编辑'
        this.isDisable = false
        this.dialogFormVisible = true
        this.isHaveNarcissisticsValue=detail.isHaveNarcissistic
        this.isHavePictureValue=detail.isHavePicture
        this.sexs=detail.sex
        this.seas=detail.tag
        this.lspInfo = detail
      },
      lspSure() {
        if (this.isDisable) {
          this.isHaveNarcissisticsValue=''
          this.isHavePictureValue=''
          this.sexs=''
          this.seas=''
          this.dialogFormVisible=false
          return
        }
        this.lspInfo.tag=this.seas
        this.lspInfo.sex=this.sexs
        this.lspInfo.isHavePicture=this.isHavePictureValue
        this.lspInfo.isHaveNarcissistic=this.isHaveNarcissisticsValue
        this.$post("/show-server/saveOrUpdate",{lspWx:this.lspInfo})
          .then(res=>{
            if (!res.data.success){
              this.$fail(res.data.message)
            }
          })
        this.dialogFormVisible=false
        //回调查询接口更新列表
        this.findLspList();
      },
      /*查询接口*/
      findLspList() {
        this.$get("/show-server/findLspList?current="+this.current+"&size="+this.size+"&name="+this.put)
          .then(res=>{
            console.log(res.data.data)
            this.totals=res.data.data.total
            this.tableData=res.data.data.seconds
            this.$success(res.data.message)
          })
      },
      /*删除*/
      deleteLspById(id) {
        this.$success("成功");
      },
      getPageSize(paegSize) {
        this.size = paegSize;
        this.findLspList()
      },
      getCurrent(current) {
        this.current = current;
        this.findLspList()
      },
      indexMethod(index) {
        return index == 0 ? 1 : index + 1
      },
    },
    created(){
      this.findLspList();
    },
    mounted(){
      this.findLspList();
    }
  }

</script>

<style scoped>

</style>
