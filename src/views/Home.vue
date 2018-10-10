<template>
<v-app id="inspire">
    <div v-if='!user'>
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
    			</v-card-title>
    			<v-card-actions>	
    				<v-carousel id="carousel">
    					<v-carousel-item
      					v-for="(item) in items"
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
    			</v-card-title>
    			<v-card-actions>	
    				<v-carousel id="carousel">
    					<v-carousel-item
      						v-for="(item) in sanya_items"
      						:key="item.id"
      						:src="item.src"
    					></v-carousel-item>
  					</v-carousel>
  				 </v-card-actions>
  			</v-card>
				<v-card v-for='item in items' :key='item.src' class='mb-2	blue lighten-5'>
					<v-card-title>{{item.name}}</v-card-title>
					<v-card-text>
						<span>category: {{item.category}}</span>
						<br>
						<span>tags: {{item.tags.join(' ')}}</span>
					</v-card-text>
				</v-card>
  		</v-flex>
  	</div>
</v-app>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import {auth, dbModelsRef} from '../firebase'

export default {
  name: 'home',
  data(){
  	return {
  		sanya_items: [
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
			items: [],
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
	},
	created () {
		dbModelsRef.on('value', (snapshot) => {
			let items = []
			snapshot.forEach(element => {
        let { category, tags, url, name } = element.val()
        items.push({
          category: category || 'piski',
          src: url || 'url_to_not_avaliable',
          name: name || 'no name',
          tags: name || ['no tags']
        })
			})
			this.items = items
		})
	}
}
</script>

