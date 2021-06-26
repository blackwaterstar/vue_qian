<!--<template>-->
<!-- <el-calendar>-->
<!--<el-aside width="200px">-->
<!--  <el-menu default-active="this.$router.path">-->
<!--    <h3>后台系统后台</h3>-->
<!--        <el-menu-item index="1">-->
<!--          <router-link to="/usermanage" tag="span" slot="title">-->
<!--          用户管理-->
<!--        </router-link>-->
<!--        </el-menu-item>-->
<!--&lt;!&ndash;        <el-menu-item index="/index/UserManagement">用户管理</el-menu-item>&ndash;&gt;-->
<!--    <el-submenu index="2">-->
<!--      <template slot="title">-->
<!--        <i class="el-icon-upload"></i>-->
<!--        <span>资料上传</span>-->
<!--      </template>-->


<!--        <el-menu-item>-->
<!--          <router-link to="/productManage" tag="span" slot="title">shangping管理</router-link>-->
<!--        </el-menu-item>-->
<!--      <el-menu-item>-->
<!--        <router-link to="/productManage" tag="span" slot="title">shangping管理</router-link>-->
<!--      </el-menu-item>-->
<!--    </el-submenu>-->

<!--      <el-menu-item index="3">-->
<!--        <router-link to="/usermanage" tag="span" slot="title">-->
<!--          用户管理-->
<!--        </router-link>-->
<!--      </el-menu-item>-->


<!--  </el-menu>-->
<!--</el-aside>-->

<!--  <el-main>-->
<!--    <router-view></router-view>-->
<!--  </el-main>-->

<!-- </el-calendar>-->
<!--</template>-->

<!--<style></style>-->

<!--<script>-->


<!--</script>-->
<template>
  <el-container>
    <el-aside width="200px">
  <div>
    <el-col :span="2">
      <el-menu
        :default-active="this.$route.path"
        router
        mode="horizontal"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
          <template slot="title">
            <i class="el-icon-s-platform"></i>
            <span> {{ item.navItem }}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-col>

<!--    <router-view class="menu-right"/>-->
  </div>
 </el-aside>
    <el-main><router-view class="menu-right"/></el-main>
  </el-container>
</template>
<script>
  export default {
    data() {
      return {
        navList: [
          { name: "/usermanage", navItem: "用户管理" },
          { name: "/productManage", navItem: "商品管理" },
          { name: "/productManage", navItem: "地图参数" },
          { name: "/usermanage", navItem: "地图图片" },
        ],
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    },
  };
</script>

<style>
  .menu-right {
    margin-left: 200px;
  }
</style>
