import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' 
import {auth} from './firebase'
 
Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  data: {
    user: null
  },
  router,
  render: h => h(App),
  created () {
    auth.onAuthStateChanged( (user) => {
      this.user = user || null
    })
  }
}).$mount('#app')
