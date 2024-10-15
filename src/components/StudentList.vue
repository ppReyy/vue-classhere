<template>  
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