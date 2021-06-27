
<template>
  <div id="app">
    <!-- 其他页 -->
    <el-container v-if="$route.meta.keepAlive">
      <el-header>
        <keep-alive>
          <!-- 导航栏 -->
          <header-nav></header-nav>
        </keep-alive>
      </el-header>
      <el-container>
        <el-aside width="300px">
          <!-- 侧边栏 -->
          <keep-alive>
            <left></left>
          </keep-alive>
        </el-aside>
        <el-main>
          <!-- Body -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

    <!-- 登录页 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>


<!--<template>-->

<!--  <div id="app">-->
<!--    <router-view></router-view>-->
<!--  </div>-->


<!--</template>-->

<script>
import header from "./views/header";
import left from "./views/left";

export default {
  name: 'App',
  mounted() {
    window.addEventListener('unload', this.saveState);
  },
  methods: {
    saveState() {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state));
    },
    created() {
      this.$store.dispatch('allProducts')
    },
//store/index.js
  },
  components: {
    headerNav: header,
    left: left
  }

}
</script>

<style>


</style>
