import { createApp } from 'vue'
import App from './App.vue'
import './index.less'
import router from './router/index'
// @ts-ignore
createApp(App).use(router).mount('#app')
