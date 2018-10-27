  <template>
  <div  v-if='!!user'>
    <v-navigation-drawer
      v-model="drawer"
      right
      temporary
      app
    >
        <v-list dense>
            <v-avatar class="my-4"><img :src="user.photoURL"></v-avatar><br>
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
      <v-flex text-center>
        <v-btn flat color="white cyan--text" to="/">Home</v-btn>
        <v-btn flat color="white cyan--text" to="/">Categories</v-btn>
        <v-btn flat color="white cyan--text" to="/">Groups</v-btn>
        <v-btn flat color="white cyan--text" to="/">About Us</v-btn>
      </v-flex>
      <v-text-field placeholder="Search" class="mt-2" color="white--text" prepend-icon="search" clearable></v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
 </div>
</template>

<script>
import {auth} from '../firebase'

export default {
  name: 'RootHeader',
  data() {
    return {
      drawer: null
    }
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
      this.$router.replace("/")
    }
  }
}
</script>