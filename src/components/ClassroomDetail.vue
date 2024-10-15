<template> 
    <v-card
    class="mx-auto"
    width="900"
    >
      <template v-slot:title>
          <v-card-actions >
            <span class="font-weight-black">{{ classroom.name }}</span>
            <v-spacer></v-spacer>
            <v-btn >Total: {{ classroom.students.length }} </v-btn>
            <v-btn >Present: {{ presentCount }} </v-btn>
            <v-btn >Absent: {{ absentCount }} </v-btn>
          </v-card-actions>                   
      </template>

        <v-card-text class="bg-surface-light pt-4">
            <span @click="showQRCode = true" :class="{ 'active': showQRCode }">QR Scan</span>
          <v-divider :thickness="10" class="border-opacity-0" vertical></v-divider>
            <span @click="showQRCode = false" :class="{ 'active': !showQRCode }">Manual Check-in</span>
        </v-card-text>
                           
      <v-card-text v-if="showQRCode" class="bg-surface-light pt-4"> 
        <v-row>
          <v-col cols="6">
            <img src='https://th.bing.com/th/id/R.fbd3782b74b283e3a06c44fc7600f0a8?rik=2WUTK7aTKMXbyA&riu=http%3a%2f%2fpngimg.com%2fuploads%2fqr_code%2fqr_code_PNG6.png&ehk=nUlk4YKcz%2fILTzIDicRXimAOjkyFKx9ofIkscb3FFxA%3d&risl=&pid=ImgRaw&r=0' width="200">
            <p>Time Left: {{ timeLeft }}</p>
          </v-col>

          <v-col cols="6">
            <v-text>Expired Time</v-text>
            <v-text-field
              width="250"
              :rules="rules"
              hide-details="auto"
              density="compact"
              label="Enter expired time (HH:mm)"
              variant="outlined"
              clearable
              v-model="time"
            >
            </v-text-field>
            <v-text>Quota</v-text>
            <v-text-field
              width="250"
              :rules="rules"
              hide-details="auto"
              density="compact"
              label="Enter scanning quota"
              variant="outlined"
              clearable
            >
            </v-text-field>
            <v-row class="buttonRow">
              <v-btn @click="startTimer">GENERATE</v-btn>
              <v-btn @click="stopTimer">LOOP GENERATE</v-btn>
              <v-btn @click="resetTimer">STOP</v-btn>
            </v-row>
          </v-col>      
        </v-row>   
      </v-card-text>
      
      <v-card-text v-else class="bg-surface-light pt-4 ">        
        <v-data-table          
          v-if="classroom && classroom.students"
          :headers="headers"
          :items="classroom.students"
          header-class="custom-header"
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

        <v-card-actions class="justify-center" >
          <v-btn
          variant="flat"
          color="orange" @click="checkInByNumber">SUBMIT</v-btn>
        </v-card-actions>
      </v-card> 
      
    </v-dialog>

    <v-btn>
      <router-link to="/">
        BACK
      </router-link>
    </v-btn>  
</template>
  
<script>
  import { ref, computed } from 'vue'
  import { useTimerStore } from '../store/timerStore'
  import { useClassroomStore } from '../store/students'
  import { useRoute } from 'vue-router'
 
export default {
    
  setup() {
    const timerStore = useTimerStore()
    const classroomStore = useClassroomStore()
    const route = useRoute()
    const classroomId = route.params.id

    const classroom = ref(classroomStore.classrooms.find((c) => c.id === parseInt(classroomId)))
    const presentCount = computed(() => classroom.value.students.filter((s) => s.checkedIn).length)
    const absentCount = computed(() => classroom.value.students.length - presentCount.value)

    const time = ref('')
    const setTime = () => {
      const [hours, minutes] = time.value.split(':').map(Number)
      const seconds = hours * 3600 + minutes * 60
      timerStore.setCountdown(seconds)
    }

    const timeLeft = computed(() => {
      const minutes = Math.floor(timerStore.countdown / 60)
      const seconds = timerStore.countdown % 60
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    })

    const showManualCheckInModal = ref(false)
    const selectedStudent = ref(null)

    const manualCheckIn = (studentId) => {
      showManualCheckInModal.value = true
      selectedStudent.value = classroom.value.students.find((s) => s.id === studentId)
    }

    const confirmManualCheckIn = (studentId) => {
      classroomStore.updateStudentStatus(classroom.value.id, studentId, true)
      hideManualCheckInModal()
    }

    const hideManualCheckInModal = () => {
      showManualCheckInModal.value = false
      selectedStudent.value = null
    }
  
    const studentNumber = ref('')

    const checkInByNumber = () => {
      const student = classroom.value.students.find((s) => s.number === parseInt(studentNumber.value))
      if (student) {
        classroomStore.updateStudentStatus(classroom.value.id, student.id, true)
        studentNumber.value = ''
      } else {
        alert('Student not found')
      }
    }
  
    const showQRCode = ref(true)
  
    return {
      classroom,
      presentCount,
      absentCount,
      updateStudentStatus: classroomStore.updateStudentStatus,
      timeLeft,
      countdown: timerStore.countdown,
      startTimer: timerStore.startTimer,
      stopTimer: timerStore.stopTimer,
      resetTimer: timerStore.resetTimer,
      time,
      setTime,
      manualCheckIn,
      showManualCheckInModal,
      selectedStudent,
      confirmManualCheckIn,
      hideManualCheckInModal,
      studentNumber,
      checkInByNumber,
      showQRCode,
    }
  },
  data() {
    return {
      headers: [
        { title: 'Student Name', value: 'name' },
        { title: 'Student No.', value: 'number' },        
        { title: 'Actions', value: 'actions' },
      ],
    }
  },
}
</script>

<style>
.timeInput {
    width: 300px;
    justify-items: center;
}
.buttonRow {
    margin-top: 20px;
}
.active {
    font-weight: bold;
    color: blue;
  }
.studentCard{
    margin-top: 30px;
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
.custom-header {
  text-align: center !important; 
}
   
</style>