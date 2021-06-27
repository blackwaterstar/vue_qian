<template>
  <el-row class="tac">
    <el-col :span="12">
      <h5>默认颜色</h5>
      <el-menu
        default-active="this.$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        router>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>基础管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="/userManage">用户管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="/typeManage">类别管理</el-menu-item>
          </el-menu-item-group>
<!--          <el-submenu index="1-4">-->
<!--            <template slot="title">选项4</template>-->
<!--            <el-menu-item index="1-4-1">选项1</el-menu-item>-->
<!--          </el-submenu>-->
        </el-submenu>
<!--        <el-menu-item index="2">-->
<!--          <i class="el-icon-menu"></i>-->
<!--          <span slot="title">导航二</span>-->
<!--        </el-menu-item>-->
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="/warehouseManage">
          <i class="el-icon-setting"></i>
          <span slot="title">仓库货物管理</span>
        </el-menu-item>
        <el-menu-item index="/productManage">
          <i class="el-icon-setting"></i>
          <span slot="title">商品上架管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
    export default {
        name: "",
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped>

</style>
