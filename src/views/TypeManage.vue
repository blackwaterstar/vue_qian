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
      :data="tableData"
      border
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionDelete">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="类别编号">
        <template slot-scope="scope">
          <span>{{ scope.row.ttId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="类别id">
        <template slot-scope="scope">
          <span>{{ scope.row.tid}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品名">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="right">
            <p>类别编号: {{ scope.row.tpId }}</p>
            <p>类别id: {{ scope.row.tid }}</p>
            <p>类别名称：{{ scope.row.pid }}</p>
            <div slot="reference" class="name-wrapper">
              <el-button type="text">{{ scope.row.tname }}</el-button>
            </div>
          </el-popover>
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
        <el-form-item label="类别id">
          <el-input v-model="ruleForm.tid" placeholder="请输入类别id"></el-input>
        </el-form-item>
        <el-form-item label="类别名称">
          <el-input v-model="ruleForm.tname" placeholder="请输入类别名称"></el-input>
        </el-form-item>
        <span slot="footer" class="dialog-footer">
            <el-button @click="emptyUserData()" size="medium">取 消</el-button>
            <el-button @click="addUser('ruleForm')" type="primary" size="medium">确定</el-button>
          </span>
      </el-dialog>
    </el-form>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm" size="medium">
      <el-dialog
        title="编辑"
        :append-to-body='true'
        :visible.sync="dialogUpdate"
        :before-close="handleClose">
        <el-form-item label="类别id">
          <el-input v-model="ruleForm.tid" placeholder="请输入商品id"></el-input>
        </el-form-item>
        <el-form-item label="类别名称">
          <el-input v-model="ruleForm.tname"></el-input>
        </el-form-item>
        <span slot="footer" class="dialog-footer">
            <el-button @click="emptyUserData()" size="medium">取 消</el-button>
            <el-button @click="updateUser()" type="primary" size="medium">确 定</el-button>
          </span>
      </el-dialog>
    </el-form>
    <br>
    <el-pagination
      background
      :disabled="disablePage"
      :current-page.sync="currentPage"
      small
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      @current-change="handlePageChange">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          ttId: null,
          tid: null,
          tname: null,
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
      };
    },

    created() {
      let postData1 = this.qs.stringify({
        page: this.currentPage,
        tname: this.search1,
        tid: this.search2

      });
      console.log(postData1);
      this.axios({
        method: 'post',
        url: '/type/selectTwPage',
        data: postData1
      }).then(response => {
        this.tableData = response.data;
      }).catch(error => {
        console.log(error);
      });

      let postData = this.qs.stringify({
        tname: this.search1,
        tid: this.search2
      });
      this.axios({
        method: 'post',
        url: '/type/getRowCount',
        data: postData
      }).then(response => {
        this.total = response.data;
      }).catch(error => {
        console.log(error);
      });

      this.getDep();

    },


    methods: {

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
          page: this.currentPage,
          tname: this.search1,
          tid: this.search2
        });

        console.log(`当前页: ${this.currentPage}`);
        this.axios({
          method: 'post',
          url: '/type/selectTwPage',
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
        if (this.ruleForm.tname == null ||this.ruleForm.tid== null) {
          this.$alert('用户信息不完整请检查', '温馨提示', {
            confirmButtonText: '确定'
          });
          return;
        }
        let postData = this.qs.stringify({
          ttId:this.ruleForm.ttId,
          tid: this.ruleForm.tid,
          tname: this.ruleForm.tname,
        });
        console.log(postData);
        this.axios({
          method: 'post',
          url: '/type/createTw',
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
          tname: this.search1,
          tid: this.search2
        });
        this.axios({
          method: 'post',
          url: '/type/getRowCount',
          data: postData
        }).then(response => {
          this.total = response.data;
        }).catch(error => {
          console.log(error);
        });
      },

      handleSearch() {
        let postData = this.qs.stringify({
          tname: this.search1,
          tid: this.search2
        });
        this.axios({
          method: 'post',
          url: '/type/getRowCount',
          data: postData
        }).then(response => {
          this.total = response.data;
          let countPage = Math.ceil(this.total/10);
          if (countPage <= this.currentPage) {
            this.currentPage = countPage;
          }
          this.handlePageChange();
        }).catch(error => {
          console.log(error);
        });
      },

      handleEdit(index, row) {
        this.dialogUpdate = true;
        row.ttId = Number(row.ttId);
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
          tpId: null,
          tid: null,
          pname: null,
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
            ttId: row.ttId
          });
          this.axios({
            method: 'post',
            url: '/type/deleteTwById',
            data: postData
          }).then(response => {
            this.getRowCount();
            if (this.total % 10 == 1 && this.currentPage >= 1) {
              if (this.total / 10 < this.currentPage) {
                this.currentPage = this.currentPage - 1;
              }
            }
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
        let ttIds = "";
        this.multipleSelection.forEach(item => {
          ttIds += item.ttId + ',';

        })
        console.log(ttIds);
        // let userIds= this.multipleSelection.map(item => item.userId).join()

        this.$confirm('删除操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let postData = this.qs.stringify({
            ttIdList: ttIds
          });
          console.log(postData);
          this.axios({
            method: 'post',
            url: '/type/deleteTwByIdList',
            data: postData
          }).then(response => {
            this.getRowCount();
            if (this.total % 10 == 1 && this.currentPage >= 1) {
              if (this.total / 10 < this.currentPage) {
                this.currentPage = this.currentPage - 1;
              }
            }
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
        if (this.ruleForm.tid == null || this.ruleForm.tname == null ) {
          this.$alert('信息不完整请检查', '温馨提示', {
            confirmButtonText: '确定'
          });
          return;
        }
        let postData = this.qs.stringify({
          ttId:this.ruleForm.ttId,
          tid: this.ruleForm.tid,
          tname: this.ruleForm.tname,

        });
        this.axios({
          method: 'post',
          url: '/type/updateTwById',
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
