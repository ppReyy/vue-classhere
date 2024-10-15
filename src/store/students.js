import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'


export const useClassroomStore = defineStore('classroomStore', {
  state: () => ({
    classrooms: [
      {
        id: 1,
        name: 'English 101',
        students: [
          {
            id: 1,
            name: 'John Doe',
            checkedIn: false,
            number:640001,
          },
          {
            id: 2,
            name: 'Jane Doe',
            checkedIn: false,
            number:640002,
          },
          {
            id: 3,
            name: 'Bob Smith',
            checkedIn: true,
            number:640003,
          },
        ],

        date:'2021-08-12',
        time:'15:20',
      },
      {
        id: 2,
        name: 'Math 202',
        students: [
          {
            id: 4,
            name: 'Alice Johnson',
            checkedIn: false,
            number:640004,
          },
          {
            id: 5,
            name: 'Mike Brown',
            checkedIn: false,
            number:640005,
          },
        ],
        
        
        date:'2021-10-12',
        time:'12:20',
      },
      {
        id: 3,
        name: 'Science 303',
        students: [
          {
            id: 6,
            name: 'Emily Davis',
            checkedIn: false,
            number:640006,
          },
          {
            id: 7,
            name: 'Tom Harris',
            checkedIn: false,
            number:640007,
          },
        ],
        date:'2023-10-12',
        time:'09:20',
      },
    ],
  }),
  actions: {
    checkInStudent(classroomId, studentId) {
      const classroom = this.classrooms.find((c) => c.id === classroomId)
      const student = classroom.students.find((s) => s.id === studentId)
      if (student) {
        student.checkedIn = true
        classroom.studentCount++
        classroom.presentCount++
        classroom.absentCount--
      }
    },
    deleteClassroom(id) {
        this.classrooms = this.classrooms.filter((classroom) => classroom.id !== id)
    },
    viewClassroomDetails(classroomId) {
        const router = useRouter()
        router.push({ name: 'classroom-detail', params: { id: classroomId } })
    },
    updateStudentStatus(classroomId, studentId, checkedIn) {
        const classroom = this.classrooms.find((c) => c.id === classroomId)
        const student = classroom.students.find((s) => s.id === studentId)
        if (student) {
          student.checkedIn = checkedIn
          if (checkedIn) {
            classroom.studentCount++
            classroom.absentCount--
          } else {
            classroom.studentCount--
            classroom.absentCount++
          }
        }
    },
    createClassroom(newClassroom) {
      const newId = Math.max(...this.classrooms.map((classroom) => classroom.id)) + 1
      this.classrooms.push({
        id: newId,
        name: newClassroom.name,
        students: newClassroom.students,
        date: newClassroom.date,
        time: newClassroom.time,
      })
    },  
  },
})

