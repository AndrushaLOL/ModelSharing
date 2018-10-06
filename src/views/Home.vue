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
    	    <v-btn flat color="white" to="/">Home</v-btn>
    	    <v-btn flat color="white" to="/">Categories</v-btn>
    	    <v-btn flat color="white" to="/">Groups</v-btn>
    	    <v-btn flat color="white" to="/">About Us</v-btn>
    	</v-flex>
      	<v-spacer></v-spacer>
      	<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
    </div>
    <div v-else>
    	<v-toolbar color="primary" dark fixed app>
      		<v-toolbar-title>3DWorld</v-toolbar-title>
    	    <v-flex text-lg-center>
    	    	<v-btn flat color="white cyan--text" to="/">Home</v-btn>
    	    	<v-btn flat color="white cyan--text" to="/">Categories</v-btn>
    	    	<v-btn flat color="white cyan--text" to="/">Groups</v-btn>
    	    	<v-btn flat color="white cyan--text" to="/">About Us</v-btn>
    	    </v-flex>
      		<v-spacer></v-spacer>
    		<v-btn color="red darken-4" to="/login" dark>Login</v-btn>
        </v-toolbar>	
    </div>
    <div v-if ="drawer">
    	<v-flex xs6 class="ml-5">
   	   		<v-card class="my-5">
    	 		<v-card-title primary-title>
    				<h1 class="display-1 font-weight-thin">Weekly top</h1>
    			</v-card-title primary-title>
    			<v-card-actions>	
    				<v-carousel id="carousel">
    					<v-carousel-item
      					v-for="(item,i) in items"
      					:key="item.id"
      					:src="item.src"
    					></v-carousel-item>
  					</v-carousel>
  			    </v-card-actions>
  			</v-card>
  		</v-flex>
    </div>
    <div v-else>
   		 <v-flex xs12 sm6 offset-sm3>
   		 	<v-card class="my-5">
    			<v-card-title primary-title>
    				<h1 class="display-1 font-weight-thin">Weekly top</h1>
    			</v-card-title primary-title>
    			<v-card-actions>	
    				<v-carousel id="carousel">
    					<v-carousel-item
      						v-for="(item,i) in items"
      						:key="item.id"
      						:src="item.src"
    					></v-carousel-item>
  					</v-carousel>
  				 </v-card-actions>
  			</v-card>
  		</v-flex>
  	</div>
</v-app>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import {auth} from '../firebase'

export default {
  name: 'home',
  data(){
  	return {
  		items: [
          {
            src: 'https://scottwilloughby3dg.files.wordpress.com/2014/10/3d-model-face.jpg', id:'1'
          },
          {
            src: 'https://cdna.artstation.com/p/assets/images/images/002/209/194/large/nikolay-vorobyov-donald-trump-portrait-sculpture-01.jpg?1458731386', id:'2'
          },
          {
            src: 'https://blenderartists.org/uploads/default/original/4X/0/b/6/0b6b2332bcfa1b2d45b4cf3bc0cd594a7c9e9f02.jpg', id:'3'
          },
          {
            src: 'https://www.nyfa.edu/student-resources/wp-content/uploads/2015/01/4_arms_guy_by_slocik-d4siu3e.jpg', id:'4'
          }
        ],
  		drawer: null
  	}
  },
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

