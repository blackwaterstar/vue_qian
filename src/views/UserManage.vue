<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input
          v-model="search1"
          size="mini"
          placeholder="输入用户id查询" v-on:input="handleSearch()">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="search2"
          size="mini"
          placeholder="输入用户名查询" v-on:input="handleSearch()">
        </el-input>
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
        label="用户编号">
        <template slot-scope="scope">
          <span>{{ scope.row.tuId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户账号">
        <template slot-scope="scope">
          <span>{{ scope.row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户名">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="right">
            <p>证件类型: {{ scope.row.tuId }}</p>
            <p>证件号码: {{ scope.row.userId }}</p>
            <p>用户姓名：{{ scope.row.userNickname }}</p>
            <p>用户性别: {{ scope.row.userPwd }}</p>
            <p>用户年龄: {{ scope.row.userEmail }}</p>
            <p>用户角色：{{ scope.row.userTel }}</p>
            <div slot="reference" class="name-wrapper">
              <el-button type="text">{{ scope.row.userNickname }}</el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="用户密码">
        <template slot-scope="scope">
          <span>{{ scope.row.userPwd }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="用户邮箱">
        <template slot-scope="scope">
          <span>{{ scope.row.userEmail}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户手机">
        <template slot-scope="scope">
          <span>{{ scope.row.userTel }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户状态">
        <template slot-scope="scope">
          <span>{{ scope.row.userFlag }}</span>
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
        <el-form-item label="账号">
          <el-input v-model="ruleForm.userId"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="ruleForm.userNickname"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="ruleForm.userPwd"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="ruleForm.userEmail" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机"><el-input  v-model="ruleForm.userTel" placeholder="请输入手机号码"></el-input>

        </el-form-item>

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
        <el-form-item label="账号">
          <el-input v-model="ruleForm.userId" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="ruleForm.userNickname"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="ruleForm.userPwd"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="ruleForm.userEmail" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机"><el-input  v-model="ruleForm.userTel" placeholder="请输入手机号码"></el-input>

        </el-form-item>
        <span slot="footer" class="dialog-footer">
            <el-button @click="emptyUserData()" size="medium">取 消</el-button>
            <el-button @click="updateUser()" type="primary" size="medium">确 定</el-button>
          </span>
      </el-dialog>
    </el-form>
    <br>

    <!--        <el-pagination-->
    <!--                background-->
    <!--                :disabled="disablePage"-->
    <!--                :current-page.sync="currentPage"-->
    <!--                small-->
    <!--                layout="prev, pager, next"-->
    <!--                :page-size="pageSize"-->
    <!--                :total="total"-->
    <!--                @current-change="handlePageChange">-->
    <!--        </el-pagination>-->
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="pageSizes"
                   :page-size="PageSize" layout="total, sizes, prev, pager, next, jumper"
                   :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          tuId: null,
          userId: null,
          userNickname: null,
          userPwd: null,
          userEmail: null,
          userTel: null,
          userFlag: null
        },
        rules: {},
        tableData: [],
        search1: '',
        search2: '',
        dialogAdd: false,
        dialogUpdate: false,
        pageSize: 10,
        disablePage: false,
        multipleSelection: [],
        // 默认显示第几页
        currentPage:1,
        // 总条数
        totalCount:'',
        // 个数选择器
        pageSizes:[5,10,15,20],
        // 默认每页显示的条数
        PageSize:5,

      };
    },

    created() {
      let postData1 = this.qs.stringify({
        userId: this.search1,
        userNickname: this.search2
      });
      this.axios({
        method: 'post',
        url: '/usermanage/selectUserPage1',
        data: postData1
      }).then(response => {
        this.tableData = response.data;
      }).catch(error => {
        console.log(error);
      });

      let postData = this.qs.stringify({
        userId: this.search1,
        userNickname: this.search2
      });
      this.axios({
        method: 'post',
        url: '/usermanage/getRowCount',
        data: postData
      }).then(response => {
        this.totalCount = response.data;
      }).catch(error => {
        console.log(error);
      });

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
      /**
       * 分页
       */
      handlePageChange() {
        let postData = this.qs.stringify({
          userId: this.search1,
          userNickname: this.search2
        });
        this.axios({
          method: 'post',
          url: '/usermanage/selectUserPage1',
          data: postData
        }).then(response => {
          this.tableData = response.data;
        }).catch(error => {
          console.log(error);
        });

      },

      /**
       * 添加用户
       */
      addUser() {
        if (this.ruleForm.userId == null || this.ruleForm.userNickname == null || this.ruleForm.userPwd == null || this.ruleForm.userEmail == null ) {
          this.$alert('用户信息不完整请检查', '温馨提示', {
            confirmButtonText: '确定'
          });
          return;
        }
        let postData = this.qs.stringify({
          userId: this.ruleForm.userId,
          userNickname: this.ruleForm.userNickname,//证件号码
          userPwd: this.ruleForm.userPwd,//用户姓名
          userEmail: this.ruleForm.userEmail,//用户性别
          userTel: this.ruleForm.userTel,//用户年龄
        });
        console.log(postData);
        this.axios({
          method: 'post',
          url: '/usermanage/createUser',
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
          userId: this.search1,
          userNickname: this.search2
        });
        this.axios({
          method: 'post',
          url: '/usermanage/getRowCount',
          data: postData
        }).then(response => {
          this.totalCount = response.data;
        }).catch(error => {
          console.log(error);
        });
      },
      handleSearch() {
        this.getRowCount();
        this.handlePageChange();
      },

      // handleSearch() {
      //     let postData = this.qs.stringify({
      //       userId: this.search1,
      //       userNickname: this.search2
      //     });
      //   console.log(postData);
      //     this.axios({
      //         method: 'post',
      //         url: '/usermanage/getRowCount',
      //         data: postData
      //     }).then(response => {
      //
      //         this.totalCount = response.data;
      //
      //         this.handlePageChange();
      //     }).catch(error => {
      //         console.log(error);
      //     });
      // },

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
          twId: null,//用户id
          tid: null,//证件类型
          pname: null,//证件号码
          pcount: null,//用户姓名
          pid: null,//用户性别
          tid: null,//用户年龄
          userFlag: null//用户角色
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
            tuId: row.tuId,
          });
          this.axios({
            method: 'post',
            url: '/usermanage/deleteUserById',
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
        let tuIds = "";
        this.multipleSelection.forEach(item => {
          tuIds += item.tuId + ',';

        })
        console.log(tuIds);
        // let userIds= this.multipleSelection.map(item => item.userId).join()

        this.$confirm('删除操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let postData = this.qs.stringify({
            tuIdList: tuIds
          });
          console.log(postData);
          this.axios({
            method: 'post',
            url: '/usermanage/deleteUserByIdList',
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
        if (this.ruleForm.userId == null || this.ruleForm.userNickname == null || this.ruleForm.userPwd == null || this.ruleForm.userEmail == null ) {
          this.$alert('用户信息不完整请检查', '温馨提示', {
            confirmButtonText: '确定'
          });
          return;
        }
        let postData = this.qs.stringify({
          tuId: this.ruleForm.tuId,//用户 Id
          userId: this.ruleForm.userId,//证件类型
          userNickname: this.ruleForm.userNickname,//证件号码
          userPwd: this.ruleForm.userPwd,//用户姓名
          userEmail: this.ruleForm.userEmail,//用户性别
          userTel: this.ruleForm.userTel,//用户年龄
          userFlag: this.ruleForm.userFlag,//用户角色
        });
        this.axios({
          method: 'post',
          url: '/usermanage/updateUserById',
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
    }

  }
</script>
<style scoped>

</style>
