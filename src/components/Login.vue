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
                <a @click="signInWithGoogle" class=''>
                  <v-avatar  :size='45' :tile='false'>
                    <img src="https://pbs.twimg.com/media/DdJVLUdX0AA77mU.png">
                  </v-avatar>
                </a>
                <a @click="signInWithGithub" class='mx-4'>
                  <v-avatar :size='45'  :tile='false'>
                    <img src="https://banner2.kisspng.com/20180530/qrz/kisspng-github-computer-icons-directory-5b0ec64b42e842.0836237615276949232741.jpg">
                  </v-avatar>
                </a>
                <a @click="signInWithFacebook" class='mr-4'>
                  <v-avatar :size='45'  :tile='false'>
                    <img src="https://image.flaticon.com/icons/svg/145/145802.svg">
                  </v-avatar>
                </a>
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
import firebase from 'firebase'
import {provider} from '../firebase'
import {provider2} from '../firebase'
import {provider3} from '../firebase'


export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      displayName:'',
      photoUrl: '',
      name: '',
      surname: '',
      country: '',
      phone: '',
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
      if (this.user) {
        this.$router.replace('/') 
      }
      auth.signInWithEmailAndPassword(this.email, this.password)
        .then( () => {
          this.$root.$data.user = auth.currentUser
          this.$router.replace('/')
        })
        .catch((err) => {
          this.err = err.message
        })
    },
    signInWithGoogle(){ 
      firebase.auth().signInWithPopup(provider)
      this.$root.$data.user = auth.currentUser
      this.$router.replace('/')
    },
    signInWithGithub(){ 
      firebase.auth().signInWithPopup(provider2)
      this.$root.$data.user = auth.currentUser
      this.$router.replace('/')
    },
    signInWithFacebook() {
      firebase.auth().signInWithPopup(provider3)
      this.$root.$data.user = auth.currentUser
      this.$router.replace('/')
    }

  }
}
</script>

