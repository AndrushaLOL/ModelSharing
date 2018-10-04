import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' 
import {auth} from './firebase'
 
Vue.use(Vuetify)

Vue.config.productionTip = false



//provider.addScope('https://www.googleapis.com/auth/contacts.readonly')


new Vue({
  data: {
    user: null,
    displayName: null,
    photoUrl: null,
  },
  router,
  render: h => h(App),
  created () {
    auth.onAuthStateChanged( (user) => {
      this.user = user || null
      if (user) {
      	this.displayName = user.displayName
      	this.photoUrl = user.phtoURL
  	  }

    })
  }, 
 
}).$mount('#app')
