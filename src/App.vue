<template>
  <div id="app">
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home、Search显示的，在登录、注册隐藏 -->
    <!-- <Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer> -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
// 引入
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "",
  components: {
    // kv一致省略v
    Header,
    Footer,
  },
  mounted() {
    // 通知Vuex发请求,获取数据,存储于仓库当中
    // 派发aciton||获取商品分类的三级列表数据
    this.$store.dispatch("categoryList");
  },
};
</script>

<style lang="less">
</style>

