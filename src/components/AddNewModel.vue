<template>
<v-app id="inspire">
    <div  v-if='!!user'>
    <v-navigation-drawer
      v-model="drawer"
      right
      temporary
      app
    >
        <v-list dense>
            <v-avatar class="my-4"><img :src="user.photoURL"></img></v-avatar><br>
            <strong>{{ user.displayName }}</strong><br>
            <p>{{ user.email }}</p>
            <v-divider class="mb-4 v-divider theme dark"></v-divider>
            <v-list-tile to="/profile" class="my-3">
                <v-list-tile-action>
                    <v-icon>home</v-icon>
                </v-list-tile-action>
                <v-list-tile-content class="my-3">
                    <v-list-tile-title>Profile</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/add" class="my-3">
                <v-list-tile-action>
                    <v-icon>add</v-icon>
                </v-list-tile-action>
                <v-list-tile-content class="my-3">
                    <v-list-tile-title>Add model</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/liked" class="my-3">
                <v-list-tile-action>
                    <v-icon>thumb_up</v-icon>
                </v-list-tile-action>
                <v-list-tile-content class="my-3">
                    <v-list-tile-title>Liked</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile to="/settings" class="my-3">
                <v-list-tile-action>
                    <v-icon>settings</v-icon>
                </v-list-tile-action>
                <v-list-tile-content class="my-3">
                    <v-list-tile-title>Settings</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-btn color="primary"  @click="signOut" dark>logout</v-btn>
        </v-list>   
    </v-navigation-drawer>



    <v-toolbar color="primary" dark fixed app>
        <v-toolbar-title>3DWorld</v-toolbar-title>
            <v-flex text-lg-center>
                <v-btn flat color="white cyan--text" to="/">Home</v-btn>
                <v-btn flat color="white cyan--text" to="/">Categories</v-btn>
                <v-btn flat color="white cyan--text" to="/">Groups</v-btn>
                <v-btn flat color="white cyan--text" to="/">About Us</v-btn>
            </v-flex>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>




    <v-flex xs12 sm6 offset-sm3 class="mt-5">
        <v-stepper v-model="e1">
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">Choose a name and a category</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 2" step="2">Upload a file</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3">You're done!</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card>
                        <h2 class="font-weight-thin">Pick a name</h2>
                        <v-card actions>
                            <v-text-field type="text" label="Name" :rules="nameRules" class="mb-5"></v-text-field>
                            <h2 class="font-weight-thin">Choose category</h2>
                            <v-select class="mb-5" :rules="catRules" :items="categories" label="Category.."></v-select>
                            <h2 class="font-weight-thin">Some tags</h2>                           
                            <v-combobox label="Tags" chips clearable solo multiple>
                                <template slot="selection" slot-scope="data" class="mb-5"> 
                                    <v-chip :selected="data.selected" close @input="remove(data.item)">
                                        <strong>{{ data.item }}</strong>&nbsp;
                                    </v-chip>
                                </template>
                            </v-combobox>
                        </v-card actions>
                    </v-card>
                    <v-btn color="primary" @click="e1 = 2">Continue</v-btn>         
                    <v-btn flat @click="e1 = 1">Cancel</v-btn>
                </v-stepper-content>
                <v-stepper-content step="2">
                    <v-card class="mb-5">
                        <h2 class="font-weight-thin mb-4">Upload a file</h2>
                        <v-card actions>
                            <input type="file" @change="filesChange($event.target.files)">
                            <span v-if="!!file">{{file.name[0, 7]+"..."}}</span>
                            <v-btn @click="addModel">upload</v-btn>
                            <v-progress-linear v-model="percents" color="indigo lighten-1" ></v-progress-linear>
                            <h2 class="font-weight-thin mb-4">Summary</h2>
                            <v-textarea auto-grow name="input-7-1" label="Summary" value=""></v-textarea>
                        </v-card actions>
                    </v-card>
                    <v-btn color="primary" @click="e1 = 3">Continue</v-btn>
                    <v-btn flat @click="e1 = 1">Cancel</v-btn>
                </v-stepper-content>
                <v-stepper-content step="3">
                    <v-card class="mb-5" color="grey lighten-1" height="600px">
                    </v-card>              
                    <v-btn color="primary" to="/profile">Done</v-btn>                   
                    <v-btn flat @click="e1 = 1">Cancel</v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-flex>
    </div>
</v-app>
</template>


<script>
import {modelsRef} from '@/firebase'
import {auth} from '../firebase'

export default {
    name: 'AddNewModel',
    data () {
        return {
            categories: [ 'Household', 'Gadgets', 'Art', 'Hobby', 'Toys'],
            file: null,
            url: '',
            e1: null, 
            loading: false,
            percents: 0,
            drawer: null,
            nameRules: [
                value => !!value || 'Name is required'
            ],
            catRules: [
                value => !!value || 'Category is required'
            ]    
        }
    },

    computed: {
        user () {
            return this.$root.$data.user
        }
    },
    methods: {
        filesChange(files) {
            this.file = files[0]
        },

        addModel() {
            if (!this.file) return
            const uploadTask = modelsRef.child(this.file.name).put(this.file)
            //   .then((snapshot) => {
            //       this.url = snapshot.ref.getDownloadURL()
            //   })
            uploadTask.on('state_changed', (snapshot) => {
                let total = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                if (snapshot.state == 'running') {
                    this.loading = true
                }
                if (total == 100) {
                    this.loading = false
                }
                this.percents = total
                console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100, snapshot.state, snapshot)
            })
        },
        signOut () {
            auth.signOut()
            this.$root.$data.user = auth.currentUser
        },
         remove (item) {
            this.chips.splice(this.chips.indexOf(item), 1)
            this.chips = [...this.chips]
      }
    }
}
</script>
