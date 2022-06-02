import { reqGetSearchInfo } from "@/api"
// search模块的小仓库
const state = {
    searchList: {}
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
// 获取search模块数据
const actions = {
    async getSearchList({ commit }, parmas = {}) {
        // 当前这个reqGetSearchInfo函数在调用获取服务器数据的时候,至少传递一个参数(空对象)
        // params形参:是当用户派发action的时候,第二个参数传递过来的,至少是一个空对象
        let result = await reqGetSearchInfo(parmas)
        if (result.code == 200) {
            commit("GETSEARCHLIST", result.data)
        }

    }
}
// 计算属性
// 项目中getters主要作用是简化仓库中的数据(简化数据而生)
// getters可以把我们将来在组件中需要中的数据简化一下
const getters = {
    // 当前形参state,当前仓库中的state,并非大仓库中的state
    goodsList(state) {
        // state.searchList.goodsList如果服务器数据回来了,没问题是个数组
        // 假如由于网络问题,state.searchList.goodList返回的是一个undefined
        // 计算新的属性的属性值至少给人家来一个数组
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}