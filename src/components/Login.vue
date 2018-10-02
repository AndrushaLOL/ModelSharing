<template>
    <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>    
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field label="Email"  v-model="email" prepend-icon="person" @input="err=''" type="email"></v-text-field>
                    <v-text-field id="password" prepend-icon="lock" name="password" label="Password"
                    v-model="password" 
                    @keyup.enter="signIn" 
                    @input="err = ''"
                    :append-icon="show ? 'visibility_off' : 'visibility'"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    ></v-text-field>
                    <v-alert
                    :value="err"
                    type="error"
                    >     
                    {{err}}
                    </v-alert>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="signIn" class="mr-3">Login</v-btn>
                <small class="mr-5">Do not have an account? <router-link to="/register">Register</router-link></small>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>



<script>
import {auth} from '../firebase'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      err: '',
      show: false
    }
  },
  computed: {
    user () {
      return this.$root.$data.user
    }
  },
  methods: {
    signIn () {
      if (this.user) return
      auth.signInWithEmailAndPassword(this.email, this.password)
        .then( () => {
          this.$root.$data.user = auth.currentUser
          this.$router.replace('/')
        })
        .catch((err) => {
          this.err = err.message
        })
    }
  }
}
</script>