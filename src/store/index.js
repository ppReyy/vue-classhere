import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter',{  
  state: () => {    
    return {
      classroomList: [
        {
          id:'1',
          name: 'English101',
          studentList: [
            { name: 'john', studentNo: '1234', status: 'ABSENT' },
          ],
        },
      ],
      name : 'Ice cream sandwich'   
    }
    
  },
  
  actions:{    
    addData(newData) {
      this.counter.push(newData)
    },
    increaseCount()
    {
      this.name ='Ice cream sandwich'
      this.studentNum = '10'
      this.date = '19-10-22'
    },
    decreaseCount(){
      this.name ='Eclair'
    },
    findItem(id) {
      
      return this.classroomList.find((item) => item.id === id)
    },
  },
 
})
