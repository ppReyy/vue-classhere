<template>    
    <v-data-table
      :headers="headers"
      :items="students"
      :sort-by="[{ key: 'studentNum', order: 'asc' }]"
    >
    
      <template v-slot:top>
        <v-toolbar
          color="white"
          flat
        >
          <v-toolbar-title class="title"></v-toolbar-title>  
          
          <div class="mx-left">
                <router-link to="/">                
                  <v-btn                  
                  variant="flat"              
                  color="white">
                  CANCLE
                  </v-btn>
                </router-link>
          </div>       

          <div class="mx-left">
                <router-link to="/">
                <v-btn
                class="primary"
                variant="flat"              
                color="#FF9800"       
              >
                SAVE
              </v-btn>
                </router-link>
          </div>
          <v-spacer></v-spacer>
          
          <v-dialog
            v-model="dialog"
            max-width="500px">
            <v-card>
                
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              
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
                        label="Dessert name"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                      sm="6"
                    >
                      <v-text-field
                        v-model="editedItem.studentNum"
                        label="studentNum"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      md="4"
                      sm="6"
                    >
                      <v-text-field
                        v-model="editedItem.fat"
                        label="Fat (g)"
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
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
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
        
        <v-sheet class="mx-left" width="300">
        <div class="text-left">
          <v-text class="boldText">
            Name
          </v-text>
        </div>
        <div>
          <v-text-field
            :rules="rules"
            hide-details="auto"
            density="compact"
            label="Enter classroom name"
            variant="outlined"
            clearable
          >
          </v-text-field>      
        </div>
        </v-sheet>

        <v-sheet class="mx-left">
            <v-toolbar color="white">
                <div class="text-left">
                    <v-text>Student List</v-text>
                </div>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <aleartView/>
            </v-toolbar>
        </v-sheet>
        
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
  
<script>
  import AleartView from './aleartView.vue';
    
    export default {
        components:{
            AleartView,
        },
    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
        {
            title: 'Name',
            align: 'start',
            sortable: false,
            key: 'name',
        },
        { title: 'Student No.', key: 'studentNum' },
        
        { title: 'Actions', key: 'actions', sortable: false },
        ],
        students: [],
        editedIndex: -1,
        editedItem: {
        name: '',
        studentNum: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
        },
        defaultItem: {
        name: '',
        studentNum: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
        },
    }),

    computed: {
        formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
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
            name: 'Frozen Yogurt',
            studentNum: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
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
    },
    }
</script>
  
<style>
  .title {
    color: black;
    font-size: 30px;
  }
  
  .primary {
    color: rgb(255, 255, 255) !important;
    background-color: rgb(238, 136, 20) !important;
  }  

  .mx-left{
  padding-left: 10px;
  margin-top: 10px;  
  }
</style>