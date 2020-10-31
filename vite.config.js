module.exports = {
  // 配置Dep优化行为
  publicPath: '/',
  baseUrl :process.env.NODE_ENV === 'production' ?'./':'/',
  optimizeDeps: {
    include: ["lodash"]
  },
  proxy: {
    '/stockMsg': {
      target: 'https://hq.sinajs.cn',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/stockMsg/, '')
    },
    '/stockList': {
      target: 'http://suggest3.sinajs.cn',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/stockList/, '')
    }
  }
}
