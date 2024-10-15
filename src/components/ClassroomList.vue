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
                       
          <v-dialog v-model="dialog">               
            <v-card class="mx-auto"
              width="1280"
              rounded="lg">
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>                  
              </v-card-title>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  class="primary"
                  variant="flat"              
                  color="#FF9800"
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  class="primary"
                  variant="flat"              
                  color="#FF9800"
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="4"
                      sm="6"
                    >
                      <v-text-field
                        v-model="editedItem.name"
                        label="Classname"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                      sm="6"
                    >
                      <v-text-field
                        v-model="editedItem.calories"
                        label="Student"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                      sm="6"
                    >
                      <v-text-field
                        v-model="editedItem.fat"
                        label="Time"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                      sm="6"
                    >
                      <v-text-field
                        v-model="editedItem.carbs"
                        label="Carbs (g)"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                      sm="6"
                    >
                      <v-text-field
                        v-model="editedItem.protein"
                        label="Protein (g)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              
              


            </v-card>
          </v-dialog>

        </v-toolbar> 
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <RouterLink :to="{ name: 'classroom-detail', params: { id: item.id } }">
        <v-icon
          class="me-2"
          size="small"          
        >
        mdi-eye
        </v-icon>
        </RouterLink>
        <v-icon
          class="mx-3"
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
import { ref, computed, onMounted } from 'vue'

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
    }
  },
  setup() {
    const classroomStore = useClassroomStore()
    const classrooms = ref(classroomStore.classrooms)

    const classroomStudentCounts = computed(() => {
      return classrooms.value.map(classroom => {
        return {
          ...classroom,
          classroomStudentCounts: classroom.students.length
        }
      })
    })

    onMounted(() => {
      
    })

    return {
      headers: [
        { title: 'Classroom Name',
          align: 'start',
          sortable: false, 
          key: 'name',
        },          
        { title: 'Student', key: 'classroomStudentCounts' },
        { title: 'Date', key: 'date' },
        { title: 'Time', key: 'time' },
        { title: 'Actions', key: 'actions', sortable: false },
      ],
      classrooms: classroomStudentCounts,
      checkInStudent(classroomId, studentId) {
        classroomStore.checkInStudent(classroomId, studentId)
      },        
      deleteItem(item) {
        classroomStore.deleteClassroom(item.id)            
        classrooms.value = classroomStore.classrooms                        
      },
      showClassroomInfo(classroom) {
        this.selectedClassroom = classroom
        this.dialog = true
      },
      showClassroomDetails(classroom) {
        classroomStore.viewClassroomDetails(classroom.id)
      },
      close() {
        this.dialog = false
      },
      save() {
        // Add save logic here
      },
    }
  },
  method:{
    createNewClassroom() {
      this.$router.push({ name: 'new-class' });
    }
  }
}
</script>

<style>
.primary {
    color: rgb(255, 255, 255) !important;
    background-color: rgb(238, 136, 20) !important;
    
  } 

.mx-left{
  color:aliceblue; 
  }
</style>