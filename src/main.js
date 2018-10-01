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
    if (auth.currentUser) {
      this.user = auth.currentUser
    } else {
      this.user = auth.signInWithEmailAndPassword('andrey@mail.ru', '123456')
    }
  }
}).$mount('#app')
