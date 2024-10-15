<template>  
    <v-data-table
    height="500"
    :headers="headers"
    :items="students"
    :sort-by="[{ key: 'calories', order: 'asc' }]">
      
      <template v-slot:top>
        <v-toolbar
          color="white"          
          flat>          
          <v-toolbar-title class="titleTable">Classroom</v-toolbar-title>       
          <v-spacer></v-spacer>
          
              <div>
                
                <router-link to="/about">

                <v-btn
                class="primary"
                variant="flat"              
                color="#FF9800"       
                
              >
                NEW CLASSROOM
              </v-btn>
                </router-link>
              </div>      
                        
          <v-dialog
            v-model="dialog">               
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
                
                <ClassroomView/>


              </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>   
      </template>   

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          class="me-2"
          size="small"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        
        <v-icon
          size="small"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>

    </v-data-table>
</template>

<script >
import ClassroomView from './classroomView.vue';
import { useCounterStore } from '@/store';
import { mapStores } from 'pinia'



  export default {  
    
    components:{
      ClassroomView,      
    },
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          title: 'Classrom',
          align: 'start',
          sortable: false,
          key: 'name',
        },
        { title: 'Student', key: 'calories' },
        { title: 'Date', key: 'fat' },
        { title: 'Time', key: 'carbs' },
        { title: 'Protein (g)', key: 'protein' },
        { title: 'Actions', key: 'actions', sortable: false },
      ],
      students: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Classroom' : 'Edit Item'
      },
      ...mapStores(useCounterStore)
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        
        this.students = [
          {
            name: this.counterStore.name,
            calories: this.counterStore.studentNum,
            fat: this.counterStore.date,
            carbs: this.counterStore.time,            
          },
          
        ]
      },

      editItem (item) {
        this.editedIndex = this.students.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.students.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.students.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.students[this.editedIndex], this.editedItem)
        } else {
          this.students.push(this.editedItem)
        }
        this.close()
      },
      addStudent(){
        this.students = [
          {
            name: this.counterStore.name,
            calories: this.counterStore.studentNum,
            fat: this.counterStore.date,
            carbs: 24,
            protein: 4.0,
          },
          
        ]
      },     
    },
    
  }
</script>

<style>
.titleTable {
  margin-left: 20px;  
  font-size: 30px;
  margin-bottom: -8px;
}

.primary {
  color: rgb(255, 255, 255) !important;
  background-color: rgb(238, 136, 20) !important;
}

.text-left {
  font-size: 23px;
}

.mx-auto{
  margin-top: 20px;
}

.buttonLeft {
  margin-right: 20px;
}
.mx-left{
  padding-left: 10px;
  margin-top: 10px;  
  }
</style>