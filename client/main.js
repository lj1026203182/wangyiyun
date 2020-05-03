import Vue from 'vue'
import App from './App'
import store from './store'
import filter from 'filter/filter.js'
import uView from "@/uview";
import config from '@/config/index.js'

Vue.use(uView).use(filter);

Vue.prototype.$store = store
Vue.prototype.config = config

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

app.$mount()

export default app
