<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input
          v-model="search1"
          size="mini"
          placeholder="输入商品名查询" v-on:input="handleSearch()">
        </el-input>
      </el-form-item>
      <!--      <el-form-item>-->
      <!--        <el-input-->
      <!--          v-model="search2"-->
      <!--          size="mini"-->
      <!--          placeholder="输入手机号码查询" v-on:input="handleSearch()">-->
      <!--        </el-input>-->
      <!--      </el-form-item>-->
      <el-form-item>
        <el-select size="big" v-model="search2" clearable placeholder="请选择" filterable v-on:input="handleSearch()">
          <el-option
            v-for="type in types"
            :key="type.tid"
            :label="type.tname"
            :value="type.tid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          class="el-icon-circle-plus-outline"
          type="text"
          @click="dialogAdd = true">添加
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          class="el-icon-delete"
          type="text"
          @click="handleDeleteList()">删除
        </el-button>
      </el-form-item>
    </el-form>

    <el-table
      ref="multipleTable"
      :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
      border
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionDelete">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="仓库编号">
        <template slot-scope="scope">
          <span>{{ scope.row.twId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="类别id">
        <template slot-scope="scope">
          <span>{{ scope.row.tid }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品id">
        <template slot-scope="scope">
          <span>{{ scope.row.pid }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品名">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="right">
            <p>仓库编号: {{ scope.row.twId }}</p>
            <p>类别id: {{ scope.row.tid }}</p>
            <p>商品id：{{ scope.row.pid }}</p>
            <p>商品名: {{ scope.row.pname}}</p>
            <p>商品数量: {{ scope.row.pcount }}</p>
            <p>是否上架：{{ scope.row.pshelf }}</p>
            <div slot="reference" class="name-wrapper">
              <el-button type="text">{{ scope.row.pname }}</el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>


      <el-table-column
        label="商品数量">
        <template slot-scope="scope">
          <span>{{ scope.row.pcount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否上架">
        <template slot-scope="scope">
          <span>{{ scope.row.pshelf }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" size="medium">
      <el-dialog
        title="添加"
        :append-to-body='true'
        :visible.sync="dialogAdd"
        :before-close="handleClose">
        <el-form-item label="商品类别">
          <el-select size="big" v-model="ruleForm.tid" clearable placeholder="请选择" filterable>
            <el-option
              v-for="type in types"
              :key="type.tid"
              :label="type.tname"
              :value="type.tid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品id">
          <el-input v-model="ruleForm.pid" placeholder="请输入商品id"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="ruleForm.pname"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="ruleForm.pcount"></el-input>
        </el-form-item>

        <!--        <el-form-item>-->
        <!--          <el-select size="mini" v-model="ruleForm.pshelf" v-on:change="handleSearch()">-->
        <!--            <el-option label="请选择性别" value=""></el-option>-->
        <!--            <el-option label="已上架" value="已上架"></el-option>-->
        <!--            <el-option label="未上架" value="未上架"></el-option>-->
        <!--          </el-select>-->
        <!--          -->
        <!--        </el-form-item>-->
        <span slot="footer" class="dialog-footer">
            <el-button @click="emptyUserData()" size="medium">取 消</el-button>
            <el-button @click="addUser('ruleForm')" type="primary" size="medium">确 定</el-button>
          </span>
      </el-dialog>
    </el-form>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm" size="medium">
      <el-dialog
        title="编辑"
        :append-to-body='true'
        :visible.sync="dialogUpdate"
        :before-close="handleClose">
        <el-form-item label="商品类别">
          <el-select size="big" v-model="ruleForm.tid" clearable placeholder="请选择" filterable  @change="selecttname">
            <el-option
              v-for="type in types"
              :key="type.tid"
              :label="type.tname"
              :value="type.tid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类别">
          <el-input v-model="ruleForm.tname"  disabled></el-input>
        </el-form-item>
        <el-form-item label="商品id">
          <el-input v-model="ruleForm.pid" placeholder="请输入商品id" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="ruleForm.pname"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="ruleForm.pcount"></el-input>
        </el-form-item>
        <span slot="footer" class="dialog-footer">
            <el-button @click="emptyUserData()" size="medium">取 消</el-button>
            <el-button @click="updateUser()" type="primary" size="medium">确 定</el-button>
          </span>
      </el-dialog>
    </el-form>
    <br>

    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="pageSizes"
                   :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {

        ruleForm: {
          twId: null,
          tid: null,
          pname: null,
          pcount: null,
          pid: null,
          pshelf: null,

        },
        types:null,
        rules: {},
        tableData: [],
        search1: '',
        search2: '',
        dialogAdd: false,
        dialogUpdate: false,
        pageSize: 10,
        currentPage: 1,
        total: 0,
        disablePage: false,
        multipleSelection: [],
        // 默认显示第几页
        currentPage:1,
        // 个数选择器
        pageSizes:[5,10,15,20],
        // 默认每页显示的条数
        PageSize:5,

      };
    },

    created() {
      let postData1 = this.qs.stringify({
        pname: this.search1,
        tid: this.search2
      });
      console.log(postData1);
      this.axios({
        method: 'post',
        url: '/warehouse/selectTwPage1',
        data: postData1
      }).then(response => {
        this.tableData = response.data;
      }).catch(error => {
        console.log(error);
      });

      let postData = this.qs.stringify({
        pname: this.search1,
        tid: this.search2
      });
      this.axios({
        method: 'post',
        url: '/warehouse/getRowCount',
        data: postData
      }).then(response => {
        this.total = response.data;
      }).catch(error => {
        console.log(error);
      });

      this.getDep();

    },


    methods: {

      // 分页
      // 每页显示的条数
      handleSizeChange(val) {
        // 改变每页显示的条数
        this.PageSize=val
        // 在改变每页显示的条数时，要将页码显示到第一页
        this.currentPage=1
      },
      // 显示第几页
      handleCurrentChange(val) {
        // 改变默认的页数
        this.currentPage=val
      },
      selecttname(){
        console.log('type',this.types)
        const item = this.types.find(item1=> item1.tid === this.ruleForm.tid)
        console.log(item)
        this.ruleForm.tname = item.tname
      },

      getDep:function(){
        var vm = this;
        this.axios({
          method:'post',
          url: '/type/getAllTid'
        }).then(function(resp){
          vm.types = resp.data;
          console.log(resp.data);

        })
      },

      /**
       * 分页
       */
      handlePageChange() {
        let postData = this.qs.stringify({
          pname: this.search1,
          tid: this.search2
        });
        this.axios({
          method: 'post',
          url: '/warehouse/selectTwPage1',
          data: postData
        }).then(response => {
          this.tableData = response.data;
        }).catch(error => {
          console.log(error);
        });

      },

      /**
       * 添加
       */
      addUser() {
        if (this.ruleForm.tid == null || this.ruleForm.pname == null || this.ruleForm.pcount == null || this.ruleForm.pid == null ) {
          this.$alert('用户信息不完整请检查', '温馨提示', {
            confirmButtonText: '确定'
          });
          return;
        }
        let postData = this.qs.stringify({
          twId: this.ruleForm.twId,
          tid: this.ruleForm.tid,
          pid: this.ruleForm.pid,
          pname: this.ruleForm.pname,
          pcount: this.ruleForm.pcount,
          pshelf: this.ruleForm.pshelf
        });
        console.log(postData);
        this.axios({
          method: 'post',
          url: '/warehouse/createTw',
          data: postData
        }).then(response => {
          this.handlePageChange();
          this.getRowCount();
          this.$message({
            type: 'success',
            message: '已添加!'
          });
          this.emptyUserData();
          //console.log(response);
        }).catch(error => {
          console.log(error);
        });
      },

      /**
       * 统计用户个数
       */
      getRowCount() {
        let postData = this.qs.stringify({
          pname: this.search1,
          tid: this.search2
        });
        this.axios({
          method: 'post',
          url: '/warehouse/getRowCount',
          data: postData
        }).then(response => {
          this.total = response.data;
        }).catch(error => {
          console.log(error);
        });
      },

      handleSearch() {
        this.getRowCount();
        this.handlePageChange();
      },

      handleEdit(index, row) {
        this.dialogUpdate = true;
        row.tuId = Number(row.tuId);
        this.ruleForm = Object.assign({}, row, index); //这句是关键！！！
      },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
            this.emptyUserData();
          })
          .catch(_ => {
          });
      },

      /**
       * 清空绑定数据
       */
      emptyUserData() {
        this.dialogAdd = false;
        this.dialogUpdate = false;
        this.ruleForm = {
          tid: null,
          tname: null,
          pcount: null,
          pid: null,
          pshelf: null,
        };
      },

      /**
       * 根据 userId 删除用户
       * @param index
       * @param row
       */
      handleDelete(index, row) {
        //console.log(index, row);
        this.$confirm('删除操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let postData = this.qs.stringify({
            twId: row.twId
          });
          this.axios({
            method: 'post',
            url: '/warehouse/deleteTwById',
            data: postData
          }).then(response => {
            this.getRowCount();
            this.handlePageChange();

            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            //console.log(response);
          }).catch(error => {
            console.log(error);
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      handleSelectionDelete(val) {
        this.multipleSelection = val;
      },
      /**
       * 根据 userId 批量删除用户
       */
      handleDeleteList() {
        let twIds = "";
        this.multipleSelection.forEach(item => {
          twIds += item.twId + ',';

        })
        console.log(twIds);
        // let userIds= this.multipleSelection.map(item => item.userId).join()

        this.$confirm('删除操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let postData = this.qs.stringify({
            twIdList: twIds
          });
          console.log(postData);
          this.axios({
            method: 'post',
            url: '/warehouse/deleteTwByIdList',
            data: postData
          }).then(response => {
            this.getRowCount();
            this.handlePageChange();

            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            //console.log(response);
          }).catch(error => {
            console.log(error);
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },



      updateUser() {
        if (this.ruleForm.tid == null || this.ruleForm.pname == null || this.ruleForm.pcount == null || this.ruleForm.pid == null ) {
          this.$alert('用户信息不完整请检查', '温馨提示', {
            confirmButtonText: '确定'
          });
          return;
        }
        let postData = this.qs.stringify({
          twId: this.ruleForm.twId,
          tid: this.ruleForm.tid,
          pid: this.ruleForm.pid,
          pname: this.ruleForm.pname,
          pcount: this.ruleForm.pcount,
          pshelf: this.ruleForm.pshelf
        });
        this.axios({
          method: 'post',
          url: '/warehouse/updateTwById',
          data: postData
        }).then(response => {
          this.handlePageChange();
          this.getRowCount();
          this.$message({
            type: 'success',
            message: '已编辑!'
          });
          this.emptyUserData();
          //console.log(response);
        }).catch(error => {
          console.log(error);
        });
      }
    },

  }
</script>
<style scoped>

</style>
