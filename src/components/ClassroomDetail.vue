<template> 
 <v-toolbar color="white" >
  <v-card-title>{{ classroom.name }}</v-card-title>          
    <v-spacer></v-spacer>
    <div>
      <v-btn color="orange" variant="outlined" class="mx-2"><span class="boldText"> Total: {{ classroom.students.length }} </span></v-btn>
      <v-btn color="green" variant="outlined" class="mx-2"><span class="boldText">Present: {{ presentCount }} </span></v-btn>
      <v-btn color="red" variant="outlined" class="mx-2"><span class="boldText">Absent: {{ absentCount }} </span></v-btn>  
    </div>
             
  </v-toolbar>
 
  <v-container>
    <v-card
  class="mx-auto"
  width="1280"
  >
  <v-toolbar height="50" color="white">
    <div>
      <v-card-text class="bg-surface-white pt-4">
        <span class="clickMenu" @click="showQRCode = true" :class="{ 'active': showQRCode }">QR Scan</span>
      <v-divider :thickness="10" vertical></v-divider>
        <span class="clickMenu" @click="showQRCode = false" :class="{ 'active': !showQRCode }">Manual Check-in</span>
      </v-card-text>
    </div>    
  </v-toolbar> 

    <v-card-text v-if="showQRCode" class="bg-surface-light pt-4">
      <v-card width="auto" align="center">
        <CountdownTimer /> 
      </v-card>           
              
    </v-card-text>
    
    <v-card-text v-else class="bg-surface-light pt-4 ">        
      <v-data-table          
        v-if="classroom && classroom.students"
        :headers="headers"        
        :items="classroom.students"        
        item-key="id"
      >
      <template v-slot:[`item.name`]="{ item }">
        {{ item.name }}
      </template>

      <template v-slot:[`item.checkedIn`]="{ item }">
        <input type="checkbox" v-model="item.checkedIn" @change="updateStudentStatus(classroom.id, item.id, item.checkedIn)">
        {{ item.checkedIn ? 'Present' : 'Absent' }}
      </template>

      <template         
      v-slot:[`item.actions`]="{ item }" >
      <v-btn
        :class="{ 'green-button': item.checkedIn, 'red-button': !item.checkedIn }"          
        :disabled="item.checkedIn"  
        @click="manualCheckIn(item.id)"
        >
        {{ item.checkedIn ? 'PRESENT' : 'CHECK IN' }}
      </v-btn>
      </template>       
      </v-data-table>    
    </v-card-text>
  </v-card>

  </v-container>
    <v-dialog v-model="showManualCheckInModal" max-width="500">      
      <v-card class="mx-auto" height="300">
        <v-toolbar color="indigo-darken-3">
          <v-card-title class="titleHead">Class<span class="highlight-words">Here</span></v-card-title>
        </v-toolbar>
        <v-spacer></v-spacer>  
        <v-card-text>
          <v-text>Enter Student Number</v-text>
          <v-text-field
            width="250"
            :rules="rules"
            hide-details="auto"
            density="compact"
            label="Enter student number"
            variant="outlined"
            clearable
            v-model="studentNumber"
          >
          </v-text-field>
        <v-spacer></v-spacer>           
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn
          variant="flat"
          color="orange" @click="checkInByNumber"><span class="submitText">SUBMIT</span></v-btn>
        </v-card-actions>
      </v-card>       
    </v-dialog>
</template>
  
<script>
import CountdownTimer from './CountdownTimer.vue'
import { useClassroomStore } from '../store/students'
import { useRoute } from 'vue-router'

export default {
  components: {
    CountdownTimer,
  },
  data() {
    return {
      classroom: null,
      presentCount: 0,
      absentCount: 0,
      showManualCheckInModal: false,
      selectedStudent: null,
      studentNumber: '',
      showQRCode: true,
      headers: [
        { title: 'Student Name', align: 'center', value: 'name' },
        { title: 'Student No.', align: 'center', value:  'number' },
        { title: 'Actions', align: 'center', value: 'actions' },
      ],
    }
  },
  beforeMount() {
    const classroomStore = useClassroomStore()
    const route = useRoute()
    const classroomId = route.params.id

    this.classroom = classroomStore.classrooms.find((c) => c.id === parseInt(classroomId))
    if(this.classroom){
        this.presentCount = this.classroom.students.filter((s) => s.checkedIn).length
        this.absentCount = this.classroom.students.length - this.presentCount
    } else {
            console.log('Classroom not found')
    }
  },
  methods: {
    manualCheckIn(studentId) {
      this.showManualCheckInModal = true
      this.selectedStudent = this.classroom.students.find((s) => s.id === studentId)
    },
    confirmManualCheckIn(studentId) {
      const classroomStore = useClassroomStore()
      classroomStore.updateStudentStatus(this.classroom.id, studentId, true)
      this.hideManualCheckInModal()
    },
    hideManualCheckInModal() {
      this.showManualCheckInModal = false
      this.selectedStudent = null
    },
    checkInByNumber() {
      const student = this.classroom.students.find((s) => s.number === parseInt(this.studentNumber))
      if (student) {
        const classroomStore = useClassroomStore()
        classroomStore.updateStudentStatus(this.classroom.id, student.id, true)
        this.studentNumber = ''
      } else {
        alert('Student not found')
      }
    },
    updateStudentStatus(classroomId, studentId, status) {
      const classroomStore = useClassroomStore()
      classroomStore.updateStudentStatus(classroomId, studentId, status)
    },
  },
}
</script>

<style>
.active {
    font-weight: bold;
    color: blue;
    text-decoration: underline;
}
.green-button {  
  color: green;
}
.green-button:disabled {  
  color: #008a2e;
} 
.red-button {
  background-color: rgb(255, 127, 42);
  color: white;
} 
.v-btn__overlay {
  opacity: 0!important
}
.detailedClassroom {
  margin-left: 50px;
}
.navText{
  margin-left: 100px;
  margin-top: 20px;
}
.boldText {
  font-weight: 600;
}
.submitText {
  color: white;
}  
</style>