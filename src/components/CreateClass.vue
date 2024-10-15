<template>
    
    <v-toolbar color="white"
    flat
    >
    <v-card-title>New Classroom</v-card-title>
    <v-spacer></v-spacer>        
        <router-link to="/">                
        <v-btn
        class="button-spacing"            
        variant="flat"                     
        color="white">
        CANCLE
        </v-btn>
        </router-link>
            
        <router-link to="/">
            <v-btn
            class="primary"
            variant="flat"                         
            color="#FF9800"       
            >
            SAVE
            </v-btn>
        </router-link>
            
    </v-toolbar>
        
    <v-card>        
        <v-data-table
            :headers="headers"
            :items="students"
            :items-per-page="5"
            class="elevation-1">
            <template v-slot:[`item.checkedIn`]="{ item }">
              {{ item.checkedIn ? 'Yes' : 'No' }}
            </template>
        </v-data-table>        
    </v-card>
  </template>
  
  <script>
  import { useClassroomStore } from '../store/students'
  
  export default {
    setup() {
      const classroomStore = useClassroomStore()
      const students = classroomStore.classrooms.flatMap((classroom) => classroom.students)
  
      return {
        students,
        headers: [
          { title: 'Name', key: 'name' },
          { title: 'Student No.', key: 'number' },
          { title: 'Checked in', key: 'checkedIn' },
        ],
      }
    },
  }
  </script>


<style>
.button-spacing {
    margin-right: 10px; /* Adjust the value as needed */
}
</style>