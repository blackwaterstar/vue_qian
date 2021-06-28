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
        label="商品编号">
        <template slot-scope="scope">
          <span>{{ scope.row.tpId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品名">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="right">
            <p>仓库编号: {{ scope.row.tpId }}</p>
            <p>类别id: {{ scope.row.tid }}</p>
            <p>商品id：{{ scope.row.pid }}</p>
            <p>商品名: {{ scope.row.pname}}</p>
            <p>商品价格: {{ scope.row.price }}</p>
            <p>图片路径：{{ scope.row.pimg }}</p>
            <div slot="reference" class="name-wrapper">
              <el-button type="text">{{ scope.row.pname }}</el-button>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="商品价格">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品图片">
        <template slot-scope="scope">
          <img width="100px" height="100px" :src="scope.row.pimg" :preview-src-list="scope.row.pimg"/>
        </template>
      </el-table-column>
      <el-table-column
        label="类别id">
        <template slot-scope="scope">
          <span>{{ scope.row.tid}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品上架">
        <template slot-scope="scope">
          <span>{{ scope.row.pid }}</span>
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
        <el-form-item label="商品">
          <el-select size="big" v-model="ruleForm.pid" clearable placeholder="请选择商品" filterable  @change="selectpname">
            <el-option
              v-for="type in warehouses"
              :key="type.pid"
              :label="type.pname"
              :value="type.pid">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称">
          <el-input v-model="ruleForm.pname" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="ruleForm.price" placeholder="请输入商品价格" ></el-input>
        </el-form-item>
        <el-form-item label="类别id">
          <el-input v-model="ruleForm.tid" placeholder="类别id" disabled></el-input>
        </el-form-item>


        <el-form-item label="商品图片">
          <el-button type="primary" v-on:click="openFile()" round>选择文件</el-button>
          <!--          <el-button type="primary" v-on:click="showRealPath()" round>显示路径</el-button>-->
          <input type="file" name="filename" id="open"  style="display:none"/>
          <el-input v-model="ruleForm.pimg" disabled style="display:none"></el-input>
<!--          <el-upload-->
<!--            ref="ruleForm"-->
<!--            action=""-->
<!--            :auto-upload="false"-->
<!--             :http-request="upLoadFile"-->
<!--            list-type="picture-card"-->
<!--            :limit="1"-->
<!--            :on-preview="handlePictureCardPreview"-->
<!--            :on-remove="handleRemove">-->
<!--            <i class="el-icon-plus"></i>-->
<!--          </el-upload>-->
<!--          <el-dialog :visible.sync="dialogVisible">-->
<!--            <img width="100%" :src="dialogImageUrl" alt="">-->
<!--          </el-dialog>-->


        </el-form-item>

        <span slot="footer" class="dialog-footer">
            <el-button @click="emptyUserData()" size="medium">取 消</el-button>
            <el-button @click="addUser('ruleForm')" type="primary" size="medium">上架</el-button>
          </span>
      </el-dialog>
    </el-form>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm" size="medium">
      <el-dialog
        title="编辑"
        :append-to-body='true'
        :visible.sync="dialogUpdate"
        :before-close="handleClose">
<!--        <el-form-item label="商品类别">-->
<!--          <el-select size="big" v-model="ruleForm.tid" clearable placeholder="请选择" filterable>-->
<!--            <el-option-->
<!--              v-for="type in pros"-->
<!--              :key="type.pid"-->
<!--              :label="type.pname"-->
<!--              :value="type.pid">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="商品图片">-->
<!--          <el-input v-model="ruleForm.pimg" placeholder="请输入商品id"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="商品图片">
          <el-button type="primary" v-on:click="openFile1()" round>更换图片</el-button>
          <!--          <el-button type="primary" v-on:click="showRealPath()" round>显示路径</el-button>-->
          <input type="file" name="filename" id="open1"  style="display:none"/>
          <el-input v-model="ruleForm.pimg" disabled style="display:none"></el-input>
          <!--          <el-upload-->
          <!--            ref="ruleForm"-->
          <!--            action=""-->
          <!--            :auto-upload="false"-->
          <!--             :http-request="upLoadFile"-->
          <!--            list-type="picture-card"-->
          <!--            :limit="1"-->
          <!--            :on-preview="handlePictureCardPreview"-->
          <!--            :on-remove="handleRemove">-->
          <!--            <i class="el-icon-plus"></i>-->
          <!--          </el-upload>-->
          <!--          <el-dialog :visible.sync="dialogVisible">-->
          <!--            <img width="100%" :src="dialogImageUrl" alt="">-->
          <!--          </el-dialog>-->


        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
<!--        <el-form-item label="商品数量">-->
<!--          <el-input v-model="ruleForm.pcount"></el-input>-->
<!--        </el-form-item>-->
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
          tpId: null,
          tid: null,
          pname: null,
          pimg: null,
          pid: null,
          price: null,

        },
        dialogImageUrl: '',
        dialogVisible: false,
        types:null,
        warehouses:null,
        pros:null,
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
        pname: this.search1,
        tid: this.search2
      });
      console.log(postData1);
      this.axios({
        method: 'post',
        url: '/product/selectTwPage',
        data: postData1
      }).then(response => {
        this.tableData = response.data;
      }).catch(error => {
        console.log(error);
      });

      let postData = this.qs.stringify({
        tid: this.search1,
        pid: this.search2
      });
      this.axios({
        method: 'post',
        url: '/product/getRowCount',
        data: postData
      }).then(response => {
        this.total = response.data;
      }).catch(error => {
        console.log(error);
      });

      this.getDep();
      this.getwarehouses();

    },


    methods: {
      openFile: function () {
        document.getElementById('open').click()
        this.showRealPath()
      },
      openFile1: function () {
        document.getElementById('open1').click()
        this.showRealPath()
      },
      showRealPath: function () {
        // document.getElementById('input01').value = document.getElementById('open').value
        this.ruleForm.pimg = document.getElementById('open').value
      },

       selectpname(){
        console.log('warehouse',this.warehouses)
       const item = this.warehouses.find(item1=> item1.pid === this.ruleForm.pid)
       console.log(item)
         this.ruleForm.pname = item.pname,
         this.ruleForm.tid = item.tid
     },

      // handleRemove(file, fileList) {
      //   console.log(file, fileList);
      // },
      // handlePictureCardPreview(file) {
      //   this.dialogImageUrl = file.url;
      //   this.dialogVisible = true;
      //   console.log(file.url);
      // },

      getwarehouses:function(){
        var vm = this;
        this.axios({
          method:'post',
          url: '/warehouse/queryUserPage1'
        }).then(function(resp){
          vm.warehouses = resp.data;
          console.log(resp.data);

        })
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
          page: this.currentPage,
          pname: this.search1,
          tid: this.search2
        });

        console.log(`当前页: ${this.currentPage}`);
        this.axios({
          method: 'post',
          url: '/product/selectTwPage',
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
        if (this.ruleForm.pimg == null ||this.ruleForm.price == null) {
          this.$alert('用户信息不完整请检查', '温馨提示', {
            confirmButtonText: '确定'
          });
          return;
        }
        let postData = this.qs.stringify({
          tpId:this.ruleForm.tpId,
          tid: this.ruleForm.tid,
          pname: this.ruleForm.pname,
          pimg:  document.getElementById('open').value,
          pid: this.ruleForm.pid,
          price: this.ruleForm.price,
          file: this.ruleForm.file

        });
        console.log(postData);
        this.axios({
          method: 'post',
          url: '/product/createTw',
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
          url: '/product/getRowCount',
          data: postData
        }).then(response => {
          this.total = response.data;
        }).catch(error => {
          console.log(error);
        });
      },

      handleSearch() {
        let postData = this.qs.stringify({
          pname: this.search1,
          tid: this.search2
        });
        this.axios({
          method: 'post',
          url: '/product/getRowCount',
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
          ttId: null,
          tid: null,
          tname: null,
          pimg: null,
          pid: null,
          price: null,
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
            url: '/product/deleteTwById',
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
        let tuIds = "";
        this.multipleSelection.forEach(item => {
          tuIds += item.tpId + ',';

        })
        console.log(tuIds);
        // let userIds= this.multipleSelection.map(item => item.userId).join()

        this.$confirm('删除操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let postData = this.qs.stringify({
            twIdList: tuIds
          });
          console.log(postData);
          this.axios({
            method: 'post',
            url: '/product/deleteTwByIdList',
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
        if (this.ruleForm.pimg == null || this.ruleForm.price == null ) {
          this.$alert('信息不完整请检查', '温馨提示', {
            confirmButtonText: '确定'
          });
          return;
        }
        let postData = this.qs.stringify({
          tpId:this.ruleForm.tpId,
          tid: this.ruleForm.tid,
          pname: this.ruleForm.pname,
          pimg: document.getElementById('open1').value,
          pid: this.ruleForm.pid,
          price: this.ruleForm.price
        });
        this.axios({
          method: 'post',
          url: '/product/updateTwById',
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
