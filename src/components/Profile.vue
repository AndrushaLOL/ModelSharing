<template>
	<v-flex xs12 sm6 offset-sm3	class='my-5'>
		<v-card style='margin: 100px 0 50px 0'>
			<v-avatar class="my-4" :size="250" :tile="true"><img :src="user.photoURL"></v-avatar><br>
			<h1 class='d-inline'>Name: </h1>
			<h1 class='font-weight-thin d-inline'>*name*</h1><br>
			<h1 class='d-inline'>Surname: </h1>
			<h1 class='font-weight-thin d-inline'>*surname*</h1><br>
			<h1 class='d-inline'>Email: </h1>
			<h1 class='font-weight-thin d-inline'>{{user.email}}</h1><br>
			<h1 class='d-inline'>Nickname: </h1>
			<h1 class='font-weight-thin d-inline'>{{user.displayName}}</h1><br>
			<h1 class='d-inline'>Country: </h1>
			<h1 class='font-weight-thin d-inline'>*country*</h1><br>
			<h1 class='d-inline'>Phone number: </h1>
			<h1 class='font-weight-thin d-inline'>*phonenumber*</h1><br>
			<v-btn color="primary" to='/settings'>Edit</v-btn>
		</v-card> 
	</v-flex>
</template>



<script>
import {auth} from '../firebase'

export default {
  name: 'Profile',
  computed: {
    user () {
      return this.$root.$data.user
    }
  },

  methods: {
    signOut () {
      auth.signOut()
      this.$root.$data.user = auth.currentUser
      this.$router.replace("/")
    }
  }
}
</script>

