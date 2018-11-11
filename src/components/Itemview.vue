<template>
  <div>
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
          ></v-text-field> 
        </v-flex>    
        <v-spacer id='spacer2'></v-spacer>
        <v-btn color="indigo darken-1 white--text" id='login' to="/login">Login</v-btn>
      </v-toolbar>  
    </div>
    <v-flex lg8 offset-lg2> 
      <v-card id='container'>  
        <v-flex lg12 class='text-lg-center' v-for='(item, i) in items' :key='i'>
          <h1 class='display-2 mb-5 pt-4'>{{item.name}}</h1>
          <img id='image' class='mb-3' :src="item.urlImg">
          <h1 class="display-2 mb-4">{{ item.price }} RUB</h1>
          <v-btn flat :color='color' @click.once='like()' :disabled='disabledLike'><v-icon>thumb_up</v-icon></v-btn>
          <v-btn flat :color='color2' @click.once='dislike()' :disabled='disabledDislike'><v-icon>thumb_down</v-icon></v-btn><br>
          <p class='d-inline'>Likes: {{ likes }}</p>
          <p class='d-inline ml-5'>Dislikes: {{ dislikes }}</p>
        </v-flex>
      </v-card>
      <v-flex class='my-5' v-for='(item, i)  in items' :key='i'>
        <v-card>
          <v-tabs color="primary"
          dark
          slider-color="white">
            <v-tab ripple>Details</v-tab>
            <v-tab-item>
              <v-card>
                <h3 class='font-weight-medum mt-4 ml-4 text-lg-left'>Category:<h2 class='font-weight-thin ml-4 text-lg-left'>{{ item.category }}</h2></h3>
                <h3 class='font-weight-medium mt-4 ml-4 text-lg-left'>Description:<h2 class='font-weight-thin ml-4 text-lg-left'>{{ item.description }}</h2></h3>
                <h3 class='font-weight-medum mt-4 ml-4 text-lg-left'>Tags: <v-chip v-for='tag in item.tags' class='font-weight-thin'> {{ tag }}</v-chip>
                </h3>
              </v-card>
            </v-tab-item>
            <v-tab ripple>Comments</v-tab>
            <v-tab-item>
              <v-card height='100'>
                <p class="pt-5">No comments yet</p>
              </v-card>
            </v-tab-item>
            <v-tab ripple>text</v-tab>
            <v-tab-item>
              <v-card height='100'>
                <p class="pt-5">Text</p>
              </v-card>
            </v-tab-item>
          </v-tabs>    
        </v-card>
      </v-flex>
    </v-flex>
  </div>      
</template>

<script>
import {auth, dbModelsRef} from '../firebase'
import firebase from 'firebase'


export default {
  name: 'Itemview',
  data() {
  	return {
      categories: [ 'Household', 'Gadgets', 'Art', 'Hobby', 'Toys'],
      showNav: true,
      items: [],
      id: null,
      likes: 0,
      dislikes: 0,
      likeBtn: null,
      color: null,
      color2: null,
      disabledLike: false,
      disabledDislike: false
    }
  },

  computed: {
    user () {
      return this.$root.$data.user
    }
  },

  methods: {
    like(){
      this.color = "success"
      this.disabledDislike = true
      this.likes += 0.5
      if (this.dislikes != 0) this.dislikes -= 0.5

    },
    dislike(){
      this.color2 = "error"
      this.disabledLike = true
      this.dislikes += 0.5
      if (this.likes != 0) this.likes -= 0.5
    },
    signOut () {
      auth.signOut()
      this.$root.$data.user = auth.currentUser
      this.$router.replace("/")
    },
    home() {
      if (window.innerWidth <= 1000){
        this.$router.replace('/')
      }
    },
  },
  created(){
    this.id = this.$route.params.id
    const modelRef = firebase.database().ref('models/' + this.id)
    modelRef.on('value', (snapshot) => {
      let { category, tags, url, urlImg, name, description, price, comments} = snapshot.val()
        this.items.push({
          category: category,
          src: url ,
          urlImg: urlImg,
          name: name,
          price: price,
          description: description ,
          tags: tags || "No tags"
        })
    })
  }
}
</script>

<style>
  #image{
    width: 500px;
    height: 500px;
  }
  #container{
    margin-top: 100px;
  }

  @media screen and (max-width: 1000px){
    #container{
    margin-top: 60px;
    }
    #image{
      width: 300px;
      height: 300px;
    }
  }
</style>