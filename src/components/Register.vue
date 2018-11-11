<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm10 md10 lg8>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Registration form</v-toolbar-title>    
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <h2 class='font-weight-thin'>Personal informarion</h2>
                      <v-container>
                        <v-layout row wrap>
                          <v-flex xs12 sm6>
                            <v-text-field  :success='succes(this.personalName)' prepend-icon="person" :rules='[rules.required]' name="name" label="First Name" v-model="personalName"  type="text" ></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6>
                            <v-text-field  prepend-icon="person" :success='succes(this.surname)' name="surname" :rules='[rules.required]' label="Last Name" v-model="surname"  type="text"></v-text-field> 
                          </v-flex>
                          <v-flex xs12 sm6>
                            <v-text-field  prepend-icon="place" name="country" :success='succes(this.country) 'label="Country" v-model="country"  type="text"></v-text-field> 
                          </v-flex>
                          <v-flex xs12 sm6>
                            <v-text-field  prepend-icon="phone" name="phone" :success='succes(this.phone)' label="Phone number" v-model="phone"  type="number"></v-text-field> 
                          </v-flex>
                        </v-layout>
                      </v-container>
                      <h2 class='font-weight-thin'>Account informarion</h2>
                      <v-container>
                        <v-layout row wrap>
                          <v-flex xs12 sm6>
                            <v-text-field  prepend-icon="person_outline" name="login" :success='succes(this.displayName)' label="Username" v-model="displayName" :rules="[rules.required]" type="text"></v-text-field>
                          </v-flex>
                          <v-flex v-if='!file' lg6 xs12 sm6 class='d-inline-flex'>
                            <v-btn color="primary" class='mt-4' dark>
                            <input  id='profile_pic' type="file" @change='profilePic'>Profile pic   
                            <v-icon right dark>image</v-icon>
                            </v-btn>
                          </v-flex>
                          <v-flex v-else lg4 sm6 xs12 class='d-inline-flex' id='sos'>
                            <v-btn color="primary" class='mt-4' dark>
                            <input  id='profile_pic' type="file">Profile pic   
                            <v-icon right dark>image</v-icon>
                            </v-btn>
                            <img :src='imageSrc' id='picture' />
                          </v-flex>
                          <v-flex xs12 sm6>
                            <v-text-field  prepend-icon="email" name="email" label="E-mail" :success='succes(this.email)' :rules="[rules.requiredEmail, rules.email]"
                            v-model="email"  @input="err=''" type="text"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6>
                            <v-text-field id="password" prepend-icon="lock" name="password" :success='succes(this.password)' label="Password"
                            counter
                            :rules="[rules.password]"
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
                          </v-flex>
                        </v-layout>
                      </v-container>        
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="signUp" class="mr-3 ml-4">Sign Up</v-btn>
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
import {auth, dbUsersRef, storageImagesRef} from '../firebase'
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      displayName: '',
      personalName: '',
      surname: '',
      phone: '',
      country: '',
      imageSrc: null,
      show: false,
      uploadTask: null,
      photoURL: null,
      file: null,
      err: '',
      rules: {
        password: value => {
          const pattern = /^[a-z0-9_-]{6,18}$/ 
          return pattern.test(value) || 'Must be 6-18 characters' 
        },
        required: value => !!value || 'Required',
        requiredEmail: value => !!value  || 'Required, example@gmail.com',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail'
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
    profilePic(e){
      this.file = e.target.files[0]
      if (this.file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.imageSrc = e.target.result
        }
        reader.readAsDataURL(this.file)            
      }
      this.uploadTask = storageImagesRef.child(this.file.name).put(this.file)
      this.photoURL = this.uploadTask.snapshot.ref.getDownloadURL()
    },
    succes(value){
      return value !== ''
    },
    signUp () {
      if (this.user) {
        this.err = 'you already logined'
        this.$router.replace('/')
        return
      }
      auth.createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.updateProfile()
          this.$root.$data.user = auth.currentUser
          this.$router.replace('/')
        })
        .catch((err) => {
          this.err = err.message
          this.displayName
        })
      dbUsersRef.push({
        personalName: this.personalName,
        surname: this.surname,
        phone: this.phone,
        country: this.country,
        photoURL: this.photoURL['i']
      })
      },
      updateProfile () {
       auth.currentUser.updateProfile({
         displayName: this.displayName,
         email: this.email,
         photoURL: this.photoURL
      })
    }
    },

  mounted () {
    if (this.user) {
      this.$router.replace('/')
    }
  }
}

</script>

<style>
  #picture{
    width: 120px;
    height: 120px;
    margin-left: 40px;
  }
  #profile_pic{
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    cursor: inherit;
    display: block;
  }

  @media screen and (max-width: 880px){
    #picture{
      margin-top: 20px;
    }
    #sos{
      display: flex;
      flex-direction: column;
    }
  }
</style>