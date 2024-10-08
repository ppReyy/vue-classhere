<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>  
    <v-app>      
        <router-view/>         
        <v-app-bar color="black"
        rounded="lg"
        :elevation="4">
          <v-app-bar-title class="titleBar">Class<span class="highlight-words">Here</span></v-app-bar-title>
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
  padding: 100px;
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
</style>

//https://github.com/Noorulain-1095/VueJS-login-app