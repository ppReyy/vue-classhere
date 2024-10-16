<template>
  <v-data-table 
  height="500"
  :headers="headers" 
  :items="classrooms"
  :items-per-page="5"
  item-key="id"
  class="elevation-1"
  :sort-by="[{ key: 'studentclass', order: 'asc' }]">

    <template v-slot:top>
      <v-toolbar
        color="white"          
        flat
      >
                
        <v-toolbar-title class="titleTable">Classroom</v-toolbar-title>       
        <v-spacer></v-spacer>                               
            <router-link to="/new-class"> 
              <v-btn
              class="primary"
              variant="flat"              
              color="#FF9800"
              >
              NEW CLASSROOM
              </v-btn>               
            </router-link>          
                      
      </v-toolbar> 
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <RouterLink :to="{ name: 'classroom-detail', params: { id: item.id } }">
      <v-icon
        class="mx-2"
        size="small"          
      >
      mdi-eye
      </v-icon>
      </RouterLink>
      <v-icon
        class="mx-2"
        size="small"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>   
</template>
  
<script>
import { useClassroomStore } from '../store/students'

export default {
  data() {
    return {
      loading: false,
      dialog: false,
      deleteDialog: false,
      selectedClassroom: {},
      editedItem: {
        name: '',
        classroomStudentCounts: '',
        date: '',
        time: '',
      },
      defaultItem: {
        name: '',
        classroomStudentCounts: '',
        date: '',
        time: '',
      },
      classrooms: [],
      headers: [
        { title: 'Classroom Name', align: 'center', sortable: false, key: 'name' },
        { title: 'Student', align: 'center', key: 'classroomStudentCounts' },
        { title: 'Date', align: 'center', key: 'date' },
        { title: 'Time', align: 'center', key: 'time' },
        { title: 'Actions', align: 'center', key: 'actions', sortable: false },
      ],
    }
  },
  mounted() {
    this.getClassrooms()
  },
  methods: {
    getClassrooms() {
      const classroomStore = useClassroomStore()
      this.classrooms = classroomStore.classrooms.map(classroom => {
        return {
          ...classroom,
          classroomStudentCounts: classroom.students.length
        }
      })
    },
    checkInStudent(classroomId, studentId) {
      const classroomStore = useClassroomStore()
      classroomStore.checkInStudent(classroomId, studentId)
    },
    deleteItem(item) {
      const classroomStore = useClassroomStore()
      classroomStore.deleteClassroom(item.id)
      this.classrooms = classroomStore.classrooms
    },
    showClassroomInfo(classroom) {
      this.selectedClassroom = classroom
      this.dialog = true
    },
    showClassroomDetails(classroom) {
      const classroomStore = useClassroomStore()
      classroomStore.viewClassroomDetails(classroom.id)
    },
    close() {
      this.dialog = false
    },    
    createNewClassroom() {
      this.$router.push({ name: 'new-class' })
    }    
  }
}
</script>

<style>
.primary {
    color: rgb(255, 255, 255) !important;
    background-color: rgb(238, 136, 20) !important;    
  } 

</style>