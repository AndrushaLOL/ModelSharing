<template>
  <div>
    <ul v-if="!user">
      <li><v-btn color="grey lightet-4" to="/login" dark>login</v-btn></li>  
      <li><v-btn color="grey lightet-4" to="/register" dark>register</v-btn></li>  
    </ul>  
    <v-btn v-else color="grey lightet-4" @click="signOut" dark>logout</v-btn>
  </div> 
</template>

<script>
// @ is an alias to /src
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
