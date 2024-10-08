<template>
  <v-card
  class="mx-auto"
  width="1280">
    <HelloWorld />  
  </v-card>   
  
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
