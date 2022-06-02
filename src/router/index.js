// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)
// 引入路由组件
import store from '@/store'
import MyOrder from '@/views/Center/myOrder'
import GroupOrder from '@/views/Center/groupOrder'
// 先把VueRouter原型对象的push,先保存一份
let originPush = VueRouter.prototype.push;
// let originReplace = VueRouter.prototype.replace
// 重写push|replace
// 第一个参数：告诉原来的push方法，你往哪里跳转，
// 第二个参数：成功回调
// 第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // call|apply区别
        // 相同点，都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
// VueRouter.prototype.replace = function (location, resolve, reject) {
//     if (resolve && reject) {
//         originReplace.call(this.location, resolve, reject)
//     } else {
//         originReplace.call(this.location, () => { }, () => { })
//     }
// }
// 配置路由(器)
let router = new VueRouter({
    // 配置路由
    routes: [
        {
            path: "/center",
            component: () =>import('@/views/Center'),
            meta: { show: true },
            // 二级路由组件
            children:[
                {
                    path:'myorder',
                    component: MyOrder,
                },
                {
                    path:'grouporder',
                    component: GroupOrder,
                },
                {
                    path:'/center',
                    redirect:'/center/myorder',
                }
            ],
        },
        {
            path: "/paysuccess",
            component: () =>import('@/views/PaySuccess'),
            meta: { show: true }
        },
        {
            path: "/pay",
            component: () =>import('@/views/Pay'),
            meta: { show: true },
            beforeEnter:(to,from,next)=>{
                if(from.path == "/trade"||"/pay"){
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            path: "/trade",
            component: () =>import('@/views/Trade'),
            meta: { show: true },
            beforeEnter:(to,from,next)=>{
                if(from.path == "/shopcart"||"/trade"){
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            path: "/shopcart",
            component: () =>import('@/views/ShopCart'),
            meta: { show: true }
        },
        {
            path: "/addcartsuccess",
            name:'addcartsuccess',
            component: () =>import('@/views/AddCartSuccess'),
            meta: { show: true }
        },
        {
            path: "/home",
            component: () =>import('@/views/Home'),
            meta: { show: true }
        },
        {
            path: "/search/:keyword?",
            component: () =>import('@/views/Search'),
            meta: { show: true },
            name: "search",
            // 路由组件能不能传递props数据？
            // 布尔值写法:params(只能传params)
            // props:true
            // 对象写法:额外的给路由组件传递一些props参数
            // props:{a:1,b:2}
            // 常用的函数写法：可以params参数、query参数，通过pros传递给路由组件
            props: ($route) => {
                return { keyword: $route.params.keyword, k: $route.query.k }
            }
        },
        {
            path: "/login",
            component: () =>import('@/views/Login'),
            meta: { show: false }
        },
        {
            path: "/register",
            component: () =>import('@/views/Register'),
            meta: { show: false }
        },
        {
            // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页
            path: "*",
            redirect: "/home"
        },
        {
            path: "/detail/:skuid",
            component: () =>import('@/views/Detail'),
            meta: { show: true }
        },
    ],
    // 滚动行为
    scrollBehavior (to, from, savedPosition) {
        // 返回的这个y=0，代表的滚动条在最上方
        return {y:0}
    }
})
router.beforeEach(async (to,from,next)=>{
    // to:可以获取到你要跳转到哪个路由信息
    // from：可以获取到你从哪个路由而来的信息
    // next：放行函数  next（）放行   next（path）放行到指令路由    next（false）
    next()
    // 用户登录了，才会有token，未登录一定不会有token
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    // 用户已经登录了
    if(token){
        // 用户已经登录了还想去login【不能去，停留在首页】
        if(to.path=='/login'||to.path=='/register'){
            next('/')
        }else{
            // 登录了，但是去的不是login[home||search||detaill||shopcart]
            // 如果用户名已有
            if(name){
                next();
            }else{
                // 没有用户信息，派发action让仓库存储用户信息在跳转
                try {
                    await store.dispatch('getUserInfo')
                    // 放行
                    next()
                } catch (error) {
                    // token失效了获取不到用户信息，从新登录
                    // 清楚token
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    }else{
        // 未登录
        let toPath = to.path
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1){
            next('/login?redirect='+toPath)
        }else{
            next()
        }
    }
})
export default router