import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import VueFullPage from 'vue-fullpage.js'
import fullscreen from 'vue-fullscreen'
import VModal from 'vue-js-modal'

Vue.use(VueFullPage)
Vue.use(fullscreen)
Vue.use(VModal)
gsap.registerPlugin(MorphSVGPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
