<template>
<v-app id="inspire">
  <div v-if='!user'>
    <v-toolbar  dark app scroll-off-screen id='toolbar'>
      <v-menu offset-y id='menu'>
        <v-icon slot="activator">view_module</v-icon> 
        <v-list>
          <v-list-tile v-for="(item, i) in categories" :key="i" @click=''>
            <v-list-tile-title>{{ item }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-flex id='toolflex' class='d-inline-flex align-center'>
        <v-toolbar-title id='title' class='mr-5' @click='home'>3DWorld</v-toolbar-title>
        <v-btn flat to="/">Home</v-btn>
        <v-btn flat to="/groups">Groups</v-btn>
        <v-btn flat to="/about">About Us</v-btn>
        <v-menu offset-y>
        <v-btn flat slot="activator" dark>Categories</v-btn>       
        <v-list>
          <v-list-tile v-for="(item, i) in categories" :key="i" @click=''>
            <v-list-tile-title>{{ item }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
        </v-menu>
        <v-text-field
        flat
        solo-inverted
        append-icon="search"
        label="Search"
        class="mx-5 mt-2"
        v-model='search'
        ></v-text-field> 
      </v-flex>    
      <v-spacer id='spacer2'></v-spacer>
    	<v-btn color="indigo darken-1 white--text" id='login' to="/login">Login</v-btn>
    </v-toolbar>	
  </div>
  <v-flex xs12 sm8 offset-sm2 md8 offset-md2 lg6 offset-lg3>
    <v-card id ="top">
      <v-card-title primary-title>
        <h1 class="display-1 font-weight-thin">Top 5 of the week</h1>
      </v-card-title>
      <v-card-actions>  
        <v-carousel id="carousel">
          <v-carousel-item 
          @click='view(item)'
          v-for="(item, i) in items"
          :key="i"
          :src="item.urlImg"
          id='carouselItem'
          ></v-carousel-item>
        </v-carousel>
      </v-card-actions>
    </v-card>
  </v-flex>
  <v-flex md12>
    <v-container fluid grid-list-xl>
      <v-layout row wrap>
        <v-flex lg4 md6 sm12 xs12 v-for='(item,i) in itemList' :key='i' class='my-5' @click='view(item)'>
          <v-hover >  
            <v-card color='white' :id="`card${i}`" class='card' slot-scope='{ hover }' :class="`elevation-${hover ? 20 : 7}` ">
              <v-card-text>
                <v-avatar :size='215' tile><img :src="item.urlImg"></v-avatar>
                <h1 class='title font-weight-regular pt-5'>{{item.name}}</h1>
                <span>category: {{item.category}}</span>
                <br>
                <span>tags: {{item.tags.join(' ')}}</span><br>
              </v-card-text>
              <p>{{item.description}}</p>
              <h3 class='font-weight-regular'>Price: {{ item.price }} RUB</h3>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>  
    </v-container>
  </v-flex>    
</v-app>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import {auth, dbModelsRef, storageImagesRef} from '../firebase'

export default {
  name: 'home',
  data(){
  	return {
      categories: [ 'Household', 'Gadgets', 'Art', 'Hobby', 'Toys'],
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
      id: null,
      drawer: null,
      search: '',
  	}
  },
  components: {
    HelloWorld,
    },

  computed: {
    user () {
      return this.$root.$data.user
    },
    itemList() {
      return this.items.reverse().filter( (item) => (item.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1))
    }
  },
  methods: {
    view(el){
      this.id = el.key
      this.$router.push('itemview/' + this.id)
    },
    home() {
      if (window.innerWidth <= 1000){
        this.$router.replace('/')
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
			snapshot.forEach( (element) => {
        	let { category, tags, url, urlImg, name, description, price} = element.val()
        	items.push({
            key: element.key,
          	category: category,
          	src: url,
            urlImg: urlImg,
          	name: name,
          	price: price ,
            description: description ,
         		tags: tags || ['No tags']
        	})
		})
		this.items = items
		})
	}
}
</script>

<style>
  #carousel:hover{
    cursor: pointer;
  }
  .card:hover{
    cursor: pointer;
  }
  .card{
    height: 420px;
  }
  #top{
   margin: 100px 0 50px 0;
  }


  @media screen and (max-width: 1050px){
    #top{
      margin-bottom: 0px;
    }

  }
  @media screen and (max-width: 600px){
    #carousel {
      height: 200px;
    }
  }

</style>