<template>
  <nav>
    
  </nav>
    <v-app>      
        <router-view/>         
        <v-app-bar color="blue-grey-darken-4"
        rounded="lg"
        :elevation="2">        
          <v-app-bar-title class="titleBar"><router-link to="/">Class<span class="highlight-words">Here</span></router-link></v-app-bar-title>
        </v-app-bar>
    </v-app>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: justify;
  color: #2c3e50;  
}

nav {  
  padding: 50px;
  height: 50px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
.highlight-words {
  color: rgb(250, 111, 31);
}
.titleBar {
  font-size: 32px;
  font-weight: bold;
  text-align: left;
  color: white;
}
.mx-left{
  padding-left: 10px;
  margin-top: 10px;  
  }
</style>


