<template>

</template>

<script>
import {auth, dbModelsRef} from '../firebase'

export default {
  name: 'Itemview',
  data() {
  	return {
  	}
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
      this.$router.replace("/")
    }
  }
}
</script>

<style>
	#cardS{
		margin-top: 500px;
	}
</style>