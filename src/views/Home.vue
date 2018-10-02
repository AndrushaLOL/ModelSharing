<template>
  <div v-if="!!user">
  		<p>{{ user.displayName }}</p>
     	<v-btn color="grey lightet-4" @click="signOut" dark>logout</v-btn>
      <v-btn color="grey" to="/add">add</v-btn>     
  </div>
  <div v-else>
    <ul>
      <li><v-btn color="grey lightet-4" to="/login" dark>login</v-btn></li>  
      <li><v-btn color="grey lightet-4" to="/register" dark>register</v-btn></li>  
    </ul> 
  </div> 
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import {auth} from '../firebase'

export default {
  name: 'home',
  data() {
  	return {
  		displayName:''
  	}
  },
  components: {
    HelloWorld
  },

  computed: {
    user () {
      return this.$root.$data.user
    }
  },
  methods: {
    signOut () {
      auth.signOut()
      this.authUser = null
      this.$root.$data.user = auth.currentUser
    },
    updateProfile () {
      auth.currentUser.updateProfile({
        displayName: this.displayName
      })
    }

  }
}
</script>
