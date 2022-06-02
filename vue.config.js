const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 关闭eslint

  lintOnSave: false,
  transpileDependencies: true,
  productionSourceMap:false,
  // 代理跨域
  // 服务器之间不存在跨域问题， 浏览器之间才存在跨域问题，需要一个代理服务器来在前后端之间进行代理
  devServer: {
    proxy: {
      '/api': {
        // 你要获取数据的服务器的ip地址
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: { '^/api': '' },
      },
    },
  },
})
