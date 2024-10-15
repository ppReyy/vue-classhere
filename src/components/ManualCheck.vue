<template>
    <div>
      <ul>
        <li v-for="classroom in classrooms" :key="classroom.id">
          {{ classroom.name }}
          <ul>
            <li v-for="student in classroom.students" :key="student.id">
              {{ student.name }} ({{ student.number }})
              <button @click="showPopup(classroom.id, student.id)">Check In</button>
            </li>
          </ul>
        </li>
      </ul>
      <div v-if="showPopupModal" class="popup-modal">
        <div class="popup-content">
          <h2>Confirm Check-in</h2>
          <p>Are you sure you want to check in {{ selectedStudent.name }}?</p>
          <button @click="checkInStudent(selectedClassroomId, selectedStudentId)">Yes</button>
          <button @click="hidePopup">No</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useClassroomStore } from '../store/students' // Import the store
  
  export default {
  data() {
    return {
      showPopupModal: false, 
    }
  },
  setup() {
    const classroomStore = useClassroomStore() // Initialize the store

    return {
      classrooms: classroomStore.classrooms,
      selectedClassroomId: null,
      selectedStudentId: null,
      selectedStudent: null,
      checkInStudent: (classroomId, studentId) => {
        classroomStore.updateStudentStatus(classroomId, studentId, true)
        this.hidePopup()
      },
      showPopup: (classroomId, studentId) => {
        this.showPopupModal = true
        this.selectedClassroomId = classroomId
        this.selectedStudentId = studentId
        this.selectedStudent = classroomStore.classrooms.find((c) => c.id === classroomId).students.find((s) => s.id === studentId)
      },
      hidePopup: () => {
        this.showPopupModal = false
        this.selectedClassroomId = null
        this.selectedStudentId = null
        this.selectedStudent = null
      },
    }
  },
}
  </script>
  
  <style>
  .popup-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup-content {
    background-color: #f9f9f9;
    border: 1px solid #888;
    padding: 20px;
    width: 300px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  </style>