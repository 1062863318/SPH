import Vue from 'vue'
import App from './App.vue'
// 三级联动组件---全局组件
// 定义全局组件：在入口文件注册一次之后，在任何组件当中都可以使用
import TypeNav from "@/components/TypeNav"
import Carousel from "@/components/Carousel"
import Pagination from '@/components/Pagination'
import { Button,MessageBox } from 'element-ui'
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name,Pagination)
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入MockServer.js---mock数据
import '@/mock/mockSever'
// 引入swiper样式
import "swiper/css/swiper.css"
//完整引入
//引入ElementUI组件库
import ElementUI from 'element-ui';
//引入ElementUI全部样式
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'
import sdz from '@/assets/1.gif'
import "@/plugins/validate"
//应用ElementUI
Vue.use(ElementUI);
Vue.use(VueLazyload,{
  loading:sdz
})
Vue.config.productionTip = false

// 统一接口api文件夹里面全部请求函数
// 统一引入
import *as API from '@/api'
new Vue({
  // 注册路由：底下的写法KV一致省略V[router小写的]
  // 注册理由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  // 注册仓库：组件实例的身上会多了一个属性叫$store属性
  store,
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
}).$mount('#app')
