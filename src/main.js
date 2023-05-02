import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
// import Editor from 'vue-editor-js'

Vue.config.productionTip = false

// Vue.prototype.$hostname = 'http://localhost:3000'
// Vue.prototype.$hostname = 'http://localhost/Cricket/public/dashboard/dashboard-api/'
// Vue.prototype.$hostname = 'http://localhost/harris-laravel/public/api/'
Vue.prototype.$hostname = 'http://127.0.0.1:8000/api/'
// Vue.prototype.$hostname = 'https://employee.harissint.com/api/public/index.php/api/'

new Vue({
  router,
  store,
  vuetify,
  // Editor,
  render: h => h(App),
}).$mount('#app')
