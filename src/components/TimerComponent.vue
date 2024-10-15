<template>
  <div>
    <v-btn @click="startTimer">Start Timer</v-btn>
    <v-btn @click="stopTimer">Stop Timer</v-btn>
    <v-btn @click="resetTimer">Reset Timer</v-btn>
    <p>Countdown: {{ countdown }}</p>
  </div>
</template>

<script>
import { useTimerStore } from '@/store/timerStore'

export default {
  setup() {
    const timerStore = useTimerStore()

    return {
      countdown: timerStore.countdown,
      startTimer: timerStore.startTimer,
      stopTimer: timerStore.stopTimer,
      resetTimer: timerStore.resetTimer,
    }
  },
}
</script>