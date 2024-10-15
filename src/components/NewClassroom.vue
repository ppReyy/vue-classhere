<template>
    <v-toolbar color="white" flat>
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
                
            <v-btn
            class="primary"
            variant="flat"                         
            color="#FF9800"
            @click="saveNewClassroom" 
            :disabled="newClassroom.students.length === 0 || !newClassroom.name"      
            >
            SAVE
            </v-btn>                      
    </v-toolbar>

    <v-container>
      <v-row>
        <v-col cols="12" md="6">
            <v-card-title class="font-weight-bold">Name</v-card-title>
          <v-text-field
            v-model.lazy="newClassroom.name"
            :rules="[v => !!v || 'Subject name is required']"
            v-model="newClassroom.name"
            label="Classroom Name"
          ></v-text-field>
        </v-col>

        <v-toolbar color="white">
        <v-card-title >Student List</v-card-title>
        <v-spacer></v-spacer>
        <v-btn class="primary"
        variant="flat"                         
        color="#FF9800" @click="addStudent">ADD</v-btn>
      </v-toolbar>

      <v-col cols="12" md="12">
        <v-data-table
          :headers="headers"
          :items="newClassroom.students"
          class="elevation-1"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small @click="deleteStudent(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-col>

      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Add Student</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-card-title >Name</v-card-title>
                  <v-text-field v-model="newStudent.name" label="Name"></v-text-field>
                    <v-card-title >Student No.</v-card-title>
                  <v-text-field v-model="newStudent.number" label="Number"></v-text-field>
                </v-col> 
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="saveStudent">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      </v-row>
    </v-container>
</template>
  
  <script>
  import { useClassroomStore } from '../store/students'
  import { useRouter } from 'vue-router'
  
  export default {
    setup() {
      const classroomStore = useClassroomStore()
      const router = useRouter()
  
      return {
        classroomStore,
        router
      }
    },
    data() {
      return {
            newClassroom: {
                name: '',
                students: [], // Add an empty students array
                date: '',
                time: ''
            },
            headers: [
                { title: 'Name', value: 'name' },
                { title: 'Number', value: 'number' },
                { title: 'Actions', value: 'actions', sortable: false }
            ],
            newStudent: {
                name: '',
                number: ''
            },
            dialog: false
      }
    },
    headers: [
        { title: 'Name', value: 'name' },
        { title: 'Number', value: 'number' },
        { title: 'Actions', value: 'actions', sortable: false }
      ],
    methods: {
        saveNewClassroom() {
            if(this.newClassroom.name && this.newClassroom.students.length > 0) {
                const currentDate = new Date();
                this.newClassroom.date = currentDate.toISOString().slice(0, 10);
                this.newClassroom.time = currentDate.toISOString().slice(11, 16);

                this.classroomStore.createClassroom(this.newClassroom)
                this.router.push('/')
            } else {
                alert('Please enter a subject name and add at least one student')                
            }
            
        },
        addStudent() {
        this.dialog = true
        },
        close() {
        this.dialog = false
        this.newStudent = {
            name: '',
            number: ''
        }
        },
        saveStudent() {
        this.newClassroom.students.push(this.newStudent)
        this.close()
        },
        deleteStudent(item) {
        this.newClassroom.students = this.newClassroom.students.filter(student => student !== item)
        }
    }
  }
  </script>