<template>
  <div id="app">
    <v-app id='inspire'>
      <root-header />
      <router-view/>
    </v-app>
  </div>
</template>

<script>
import RootHeader from '@/components/RootHeader'

export default {
  name: 'App',
  components: {
    RootHeader
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
