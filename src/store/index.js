import Vue from 'vue'
import Vuex from 'vuex'
// 需要使用插件一次(Vuex是一是对象，对象身上有一个store方法，这个方法是一个构造函数，可以初始化vuex仓库)
Vue.use(Vuex)
// 引入小仓库
import home from "./home"
import search from './search'
import detail from './detail/detail'
import shopcart from './shopcart/shopcart'
import user from './user/user'
import trade from './trade/trade'

// 对外暴露store类的实例
export default new Vuex.Store({
    // 实现Vuex仓库模块式开发存储数据
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})
