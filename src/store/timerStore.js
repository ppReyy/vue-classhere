import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', {
  state: () => ({
    countdown: 0,
    intervalId: null, 
  }),
  actions: {
    setCountdown(seconds) {
      this.countdown = seconds
    },
    startTimer() {        
        this.intervalId = setInterval(() => {
          this.countdown -= 1
          if (this.countdown === 0) {
            this.stopTimer()
          }
        }, 1000)
      },
    stopTimer() {
      clearInterval(this.intervalId)
      this.intervalId = null
    },
    resetTimer() {
      this.stopTimer()
      this.countdown = 0
    },
  },
})