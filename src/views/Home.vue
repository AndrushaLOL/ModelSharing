<template>
<v-app id="inspire">
	<div v-if="!user">
		<v-toolbar color="primary" dark app v-scroll='onScroll' :class="{'toolbar' : hideTool }" id='toolbar'>
      		<v-flex class='d-inline-flex align-center'>
          		<v-toolbar-title id='title' class='mr-5'>3DWorld</v-toolbar-title>
          		<v-btn flat color="white cyan--text" to="/">Home</v-btn>
          		<v-btn flat color="white cyan--text" to="/categories">Categories</v-btn>
          		<v-btn flat color="white cyan--text" to="/groups">Groups</v-btn>
          		<v-btn flat color="white cyan--text" to="/about">About Us</v-btn>
          		<v-text-field
        		  flat
        		  solo-inverted
        		  append-icon="search"
        		  label="Search"
        		  class="mx-5 mt-2"
              v-model='search'
        		  ></v-text-field> 
        	</v-flex>   
      		<v-spacer></v-spacer>
	  		<v-btn color="light-blue darken-1" to='/login' dark>Login</v-btn>
    	</v-toolbar>
	</div>
  <v-flex xs12 sm6 offset-sm3>
   	<v-card id ="top">
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
  </v-flex>
  <v-flex md12>
    <v-container fluid grid-list-xl>
      <v-layout row wrap > 
        <v-flex xs4 v-for='(item,i) in itemList' :key='i' class=' my-5'>
          <v-card class='red lighten-5'>
            <v-card-text>
              <h6 class='title font-weight-regular pt-5'>{{item.name}}</h6>
              <span>category: {{item.category}}</span>
              <br>
              <span>tags: {{item.tags.join(' ')}}</span><br>
            </v-card-text>
            <p>{{item.description}}</p>
          </v-card>
          <h3 class='font-weight-regular'>Price: {{ item.price }}</h3>
        </v-flex>
      </v-layout>  
    </v-container>
  </v-flex>    	
</v-app>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import {auth, dbModelsRef} from '../firebase'

export default {
  name: 'home',
  data(){
  	return {
      hideTool: false,
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
  	  drawer: null,
      search: ''
  	}
  },
  components: {
    HelloWorld
  },

  computed: {
    user () {
      return this.$root.$data.user
    },
    itemList() {
      return this.items.filter((item) => (item.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1))
    }
  },
  methods: {
    onScroll () {
        this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
        if (this.offsetTop >= 200){
          this.hideTool = true
        } 
        else if (this.offsetTop <= 200){
          this.hideTool = false
        }
      },
    signOut () {
      auth.signOut()
      this.$root.$data.user = auth.currentUser
    }
	},
	created () {
		dbModelsRef.on('value', (snapshot) => {
			let items = []
			snapshot.forEach(element => {
        	let { category, tags, url, name, description, price} = element.val()
        	items.push({
          	category: category || 'no category',
          	src: url || 'url_to_not_avaliable',
          	name: name || 'no name',
            price: price || 'no price',
          	description: description || 'no description',
         		tags: tags || ['no tags']
        	})
		})
		this.items = items
		})
	}
}
</script>


<style>
  .toolbar {
    display: none;
  }
  #top{
   margin: 100px 0 50px 0;
  }


  @media screen and (max-width: 1000px){
    #top {
      margin: 450px 0 50px;
    },
    #toolbar{
      height: 400px;
    }
  }

</style>