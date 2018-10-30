<template>
	<v-flex xs12 sm6 offset-sm3	class='my-5'>
		<v-card id='profCard'>
			<v-avatar class="my-4" :size="250" :tile="true"><img :src="user.photoURL"></v-avatar><br>
			<h1 class='d-inline'>Name: </h1>
			<h1 class='font-weight-thin d-inline'>{{ items.personalName }}</h1><br>
			<h1 class='d-inline'>Surname: </h1>
			<h1 class='font-weight-thin d-inline'>{{ items.surname }}</h1><br>
			<h1 class='d-inline'>Email: </h1>
			<h1 class='font-weight-thin d-inline'>{{ user.email }}</h1><br>
			<h1 class='d-inline'>Nickname: </h1>
			<h1 class='font-weight-thin d-inline'>{{ user.displayName }}</h1><br>
			<h1 class='d-inline'>Country: </h1>
			<h1 class='font-weight-thin d-inline'>{{ items.country }}</h1><br>
			<h1 class='d-inline'>Phone number: </h1>
			<h1 class='font-weight-thin d-inline'>{{ items.phone }}</h1><br>
			<v-btn color="primary" @click='click'>Edit</v-btn>
		</v-card> 
	</v-flex>
</template>



<script>
import {auth, dbUsersRef} from '../firebase'

export default {
  name: 'Profile',
  data() {
  	return {
  		items: []
  	}
  },
  computed: {
    user () {
      return this.$root.$data.user
    }
  },

  methods: {
  	click(){
			console.log(this.items)

		},
    signOut () {
      auth.signOut()
      this.$root.$data.user = auth.currentUser
      this.$router.replace("/")
    }
   },
   created () {
		dbUsersRef.on('value', (snapshot) => {
			let items = []
			snapshot.forEach(element => {
        		let {personalName, surname, phone, country} = element.val()
        		items.push({
	          		personalName: personalName,
	          		surname: surname,
	          		phone: phone,
	          		country: country
        		})
			})
			this.items = items
		})
	}
}
</script>

<style>
  #profCard{
   margin: 100px 0 50px 0;
  }
  

</style>