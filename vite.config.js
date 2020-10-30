module.exports = {
  // 配置Dep优化行为
  publicPath: '/',
  baseUrl :process.env.NODE_ENV === 'production' ?'./':'/',
  optimizeDeps: {
    include: ["lodash"]
  },
  proxy: {
    '/api': {
      target: 'https://hq.sinajs.cn/',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
}
