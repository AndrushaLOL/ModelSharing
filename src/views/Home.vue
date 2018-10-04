<template>
  <div v-if="!!user">
 		<img src=":bind='user.phoroUrl'"></img><br>
  		<p>{{ user.displayName }}</p>
  		<p>{{ user.email }}</p><br>
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
      this.$root.$data.user = auth.currentUser
    }
  }
}
</script>
