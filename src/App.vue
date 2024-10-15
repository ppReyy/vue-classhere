<template>
  <nav>
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
        
    <div>{{ storeCounter.name }}</div>
    
    
    
    <v-btn @click="storeCounter.decreaseCount">-</v-btn>
    <v-btn @click="storeCounter.increaseCount">+</v-btn>     -->
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

<script setup>
// import { useCounterStore  } from '@/store/index';
// const storeCounter = useCounterStore()

</script>

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

//https://github.com/Noorulain-1095/VueJS-login-app

