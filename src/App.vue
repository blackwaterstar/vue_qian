<template>

  <div id="app">
    <router-view></router-view>
  </div>


</template>

<script>


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
  }
}
</script>

<style>


</style>
