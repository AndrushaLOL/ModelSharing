<template>
    <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Registration form</v-toolbar-title>    
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field  prepend-icon="person" name="login" label="Enter your login" v-model="displayName" :rules="[rules.required]" type="text"></v-text-field>
                    <v-text-field  prepend-icon="email" name="email" label="Enter your email" :rules="[rules.required, rules.email]"
                    v-model="email"  @input="err=''" type="text"></v-text-field>
                    <v-text-field id="password" prepend-icon="lock" name="password" label="Password"
                    counter
                   :rules="[rules.counterMin, rules.counterMax, rules.required]"
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
                <v-btn color="primary" @click="signUp" class="mr-3">Sign Up</v-btn>
                <small class="mr-5">Already have an account? <router-link to="/login">Login</router-link></small>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {auth, usersRef} from '../firebase'
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      displayName: '',
      show: false,
      err: '',
      rules: {
        required: value => !!value || 'Required',
        counterMax: value => value.length <= 20 || 'Max 20 characters',
        counterMin: value => value.length >= 8 || 'Min 8 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
    }
  },
  computed: {
    user () {
      return this.$root.$data.user
    }
  },
  methods: {
    signUp () {
      if (this.user) {    
      return this.err = 'You are already logined'
      } 
      auth.createUserWithEmailAndPassword(this.email, this.password).catch((err) => {
          this.err = err.message
        })
      this.$root.$data.user = auth.currentUser
      this.$router.replace('/')
     
    },

    updateProfile () {
      auth.currentUser.updateProfile({
        displayName: this.displayName
      })
    }
  }
}
</script>