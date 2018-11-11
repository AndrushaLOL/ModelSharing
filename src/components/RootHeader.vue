  <template>
  <div  v-if='!!user'>
    <v-navigation-drawer
      v-model="drawer"
      right
      temporary
      app
      width='240'
    >
        <v-list dense>
            <v-avatar class="my-4"  :size='65'><img :src="user.photoURL"></v-avatar><br>
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
            <v-btn color="#00bfff"  @click="signOut" dark>logout</v-btn>
        </v-list>   
    </v-navigation-drawer>


    <v-toolbar  dark app scroll-off-screen id='toolbar'>
      <v-menu offset-y id='menu'>
        <v-icon  slot="activator">view_module</v-icon> 
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
      <v-spacer id='spacer'></v-spacer>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
 </div>
</template>

<script>
import {auth, dbModelsRef} from '../firebase'


export default {
  name: 'RootHeader',
  data() {
    return {
      categories: [ 'Household', 'Gadgets', 'Art', 'Hobby', 'Toys'],
      drawer: null,
      width: null,
    }
  },

  computed: {
    user () {
      return this.$root.$data.user
    }
  },

  methods: {
    home() {
      if (window.innerWidth <= 1000){
        this.$router.replace('/')
      }
    },
    signOut () {
      auth.signOut()
      this.$root.$data.user = auth.currentUser
      this.$router.replace("/")
    }
  }
}
</script>


<style>
  #toolbar{
    background: linear-gradient(10deg, #1560bd, #00bfff);
  }
  #menu{
    display: none;
  }
   #title{
      font-size: 30px;
    }

  @media screen and (max-width: 1050px){
    #carousel {
      height: 400px;
    }
    #spacer{
      display: none;
    }
    #toolflex .v-btn{
      display: none;   
    }
    #toolflex .v-text-field{
      display: none;   
    }
    #menu{
    display: inline;
    }
    #menu:click{
    opacity: 0.5;
    }
    #title{
      font-size: 40px;
      cursor: pointer;
      margin-left: 20px;
    }

  @media screen and (max-width: 500px){
    #carousel {
      height: 200px;
    }
  }
  } 
</style>