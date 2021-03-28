<template>
    <div id="timer">
      <div class="timer">
        <div class="time">
          <span v-if="!timeupflag">{{ formatTime }}</span>
          <span v-if="timeupflag">Time up</span>
        </div>
        <div class="time-count-box" v-bind:class="{'timeron': timerOn}">
          <li v-on:click="min=1;sec=0" >1min</li>
          <li v-on:click="min=5;sec=0" >5min</li>
          <li v-on:click="min=10;sec=0">10min</li>
        </div>
        <div class="timer-controller-box">
          <button v-on:click="start" v-if="!timerOn">Start</button>
          <button v-on:click="stop" v-if="timerOn">Stop</button>
          <button v-on:click="reset" >Reset</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name:"Timer",
    data(){
        return{
            param_min:1,
            param_sec:0,
            min: 1,
            sec: 0,
            timerOn: false,
            timerObj: null,
            timeupflag: false,
        }
    },
    methods: {
        count: function() {
            if (this.sec <= 0 && this.min >= 1) {
                this.min --;
                this.sec = 59;
            } else if(this.sec <= 0 && this.min <= 0) {
                this.complete();
            } else {
                this.sec --;
            }
        },
        start: function() {
            let self = this;
            this.timerObj = setInterval(function() {self.count()}, 1000)
            this.timerOn = true;
            this.timeupflag = false;
        },
        stop: function() {
            clearInterval(this.timerObj);
            this.timerOn = false;
            this.timeupflag = false;
        },
        reset: function(){
            this.stop();
            this.min = this.param_min;
            this.sec = this.param_sec;
        },
        complete: function() {
            clearInterval(this.timerObj);
            this.timeupflag = true;
        }
    },
    computed: {
        formatTime: function() {
            let timeStrings = [
                this.min.toString(),
                this.sec.toString()
            ].map(function(str) {
                if (str.length < 2) {
                return "0" + str
                } else {
                return str
                }
            })
            return timeStrings[0] + ":" + timeStrings[1]
        }
    }
}
</script>

<style>
#timer{
  position: relative;
  display: inline-flex;
  width: 100%;
  height: 50%;
  justify-content: center;
  align-items: center;
  z-index: 11;
  background-color: white;
}
.timer{
  position: relative;
  display: inline-flex;
  width: 480px;
  height: 270px;
  box-sizing: border-box;
  background-color: rgba(240, 230, 140, 0.5);
  border: 1px solid rgba(240, 230, 140, 0.5);
  border-radius: 10%;
  z-index: 10;
}
.timer .time{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  width: 60%;
  height: 100%;
}
.timer .time-count-box{
  display: inline-flex;
  flex-direction: column;
  width: 20%;
  justify-content: space-around;
  align-items: center;

  border: 2px solid rgba(240, 230, 140, 0.2);
  border-top: none;
  border-bottom: none;
}
.timer .timeron{
  opacity: 0.5;
}
.timer .time-count-box li{
  list-style: none;
  font-size: 30px;
  display: inline-flex;
  width: 80%;;
  height: 20%;
  background-color: rgba(240, 230, 140, 0.3);
  border-radius: 20%;
  justify-content: center;
  align-items: center;
}

.timer .timer-controller-box{
  display: inline-flex;
  flex-direction: column;
  width: 20%;
  justify-content: space-around;
  align-items: center;

  border: 2px solid rgba(240, 230, 140, 0.2);
  border-top: none;
  border-bottom: none;
}
.timer .timer-controller-box button{
  list-style: none;
  font-size: 20px;
  display: inline-flex;
  width: 80%;;
  height: 20%;
  border-radius: 20%;
  justify-content: center;
  align-items: center;
  border: none;

  font-family: inherit;
}
.start{
  background-color: rgba(0, 255 ,0, 0.8);
}
.stop{
  background-color: rgba(255, 0 ,0, 0.9);
  color: white;
}
</style>