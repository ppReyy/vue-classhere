<template>
    <v-container>
        <v-row align="center"
        justify="center">
            <v-col :cols="cols[0]">
                <v-sheet>
                    <div v-if="timeRemaining">
                        <v-img :src="imageUrl" width="400" v-if="isImageVisible" />            
                        <h2><span class="timeleft">Timeleft : {{ formatTime(timeRemaining) }}</span></h2>
                    </div>
                    <div v-else>
                        <v-img :src="imageUrl" width="400" />
                        <h2><span class="timeleft">Timeleft : 00:00:00 </span></h2>
                    </div>
                </v-sheet>
            </v-col>

            <v-col 
            :cols="cols[1]">
                <v-sheet>
                    <v-col>                
                        <v-row                    
                        justify="center" 
                        >                    
                            <div>
                            <h4 class="inputText">Expired Time</h4>
                            <v-text-field 
                            density="compact" 
                            class="mx-2" 
                            width="220" 
                            type="text" 
                            v-model="inputTime" 
                            placeholder="Enter time (HH:MM)" 
                            variant="outlined" @keyup.enter="startTimer" />
                            </div>
                            
                            <div>
                            <h4 class="inputText">Scanning Quota</h4>
                            <v-text-field 
                            density="compact" 
                            class="mx-2" 
                            width="220" 
                            type="text" 
                            v-model="inputTime" 
                            placeholder="Enter scanning quota" 
                            variant="outlined" 
                            @keyup.enter="startTimer" />
                            </div>     
                        </v-row>                                               
            
                    </v-col>
                        <div>
                            <v-btn size="small" color="orange" class="mx-2" @click="startTimer" :disabled="timer">
                                <span class="buttonWh">Start Countdown</span></v-btn>    
                            <v-btn size="small" color="orange" class="mx-2" @click="toggleLoop" :disabled="timer">
                                <span class="buttonWh">Loop Generate</span></v-btn>
                            <v-btn size="small" color="red" variant="outlined" class="mx-2" @click="stopTimer" :disabled="!timer">Stop Countdown</v-btn>  
                        </div>                              
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
export default {
data() {
    return {
    inputTime: '',
    timeRemaining: null,
    timer: null,
    loopEnabled: false, 
    isImageVisible:false,
    imageUrl:'https://th.bing.com/th/id/R.fbd3782b74b283e3a06c44fc7600f0a8?rik=2WUTK7aTKMXbyA&riu=http%3a%2f%2fpngimg.com%2fuploads%2fqr_code%2fqr_code_PNG6.png&ehk=nUlk4YKcz%2fILTzIDicRXimAOjkyFKx9ofIkscb3FFxA%3d&risl=&pid=ImgRaw&r=0',
    };
},
methods: {
    startTimer() {
    this.loopEnabled = false;
    const [hours, minutes] = this.inputTime.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || minutes < 0 || minutes >= 60) {
        alert('Please enter a valid time in HH:MM format.');
        return;
    }

    this.timeRemaining = hours * 3600 + minutes * 60; // Convert to seconds
    this.clearTimer(); // Clear any existing timer
    this.isImageVisible = true;
    this.timer = setInterval(() => {
        if (this.timeRemaining > 0) {
        this.timeRemaining--;
        } else {
        this.clearTimer();
        this.isImageVisible = false;
        if (this.loopEnabled) {
            this.restartTimer(); // Automatically restart if loop is enabled
        }
        }
    }, 1000);
    },
    startTimerLoop() {
    this.loopEnabled = false;
    const [hours, minutes] = this.inputTime.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || minutes < 0 || minutes >= 60) {
        alert('Please enter a valid time in HH:MM format.');
        return;
    }

    this.timeRemaining = hours * 3600 + minutes * 60; // Convert to seconds
    this.clearTimer(); // Clear any existing timer
    this.isImageVisible = true;
    this.timer = setInterval(() => {
        if (this.timeRemaining > 0) {
        this.timeRemaining--;
        } else {
        this.clearTimer();
        this.isImageVisible = false;
        if (this.loopEnabled) {
            this.restartTimer(); // Automatically restart if loop is enabled
        }
        }
    }, 1000);
    },      
    stopTimer() {
    this.clearTimer();
    this.timer = null;
    this.timeRemaining = 0;
    this.isImageVisible = false; 
    },
    restartTimer() {
    this.stopTimer(); // Stop the current timer
    this.startTimer(); // Start the timer again with the same input time
    },
    toggleLoop() {
    this.startTimerLoop();
    this.loopEnabled = true
    
    },
    clearTimer() {
    if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
    }
    },
    formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    },
},
beforeUnmount() {
    this.clearTimer(); 
},
computed: {
      cols () {
        const { lg, sm } = this.$vuetify.display
        return lg ? [4, 8]
          : sm ? [9, 3]
            : [4, 8]
      },
    },
};
</script>
  
<style>
.buttonWh {    
  color: white;
}
.timeleft {
    color: red;    
}
.inputText {
    text-align: left;
    margin-bottom:5px ;
}
.buttonRow {
    align-items: center;
}

</style>