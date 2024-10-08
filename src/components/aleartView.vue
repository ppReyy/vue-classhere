<template>
  <div class="text-center pa-4">
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" fullscreen>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn          
          size="small"
          text="Add"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-dialog v-model="dialog" width="350" >
        <v-toolbar color="orange">          
          <v-toolbar-title class="titleHead">Add Student</v-toolbar-title>
            
          
          <v-btn icon="mdi-close" @click="dialog = false"></v-btn>
        </v-toolbar>
        <v-list lines="two" subheader>
          
          <v-list-item class="b"            
            title="Student Name"
            link
          >
          <div>
            <v-text-field
              :rules="rules"
              hide-details="auto"
              label="Enter Student Name"
            ></v-text-field>
            
          </div>
        
        </v-list-item>

          <v-divider></v-divider>
          
          <v-list-item
            
            title="Student No."
            link
          >
          <div>
            <v-text-field
              :rules="rules"
              hide-details="auto"
              label="Enter Student No."
            ></v-text-field>            
          </div>
        
        </v-list-item>        
        </v-list>
        
        <v-btn @click="dialog = false">Add</v-btn>
      </v-dialog>
      
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialog: false,                  
        widgets: false,
        rules: [
        value => !!value || 'Required.',
        value => (value || '').length <= 20 || 'Max 20 characters',
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      ],        
      }
    }
    
  }
</script>

<style>
  .titleHead{
    color: rgb(255, 255, 255);
    font-weight: bold;    
  }
</style>
