<template>
  <div id="clock">
    <p class="date">
      {{ date }}
    </p>
    <p class="time">
      {{ time }}
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      time: '',
      date: '',
      week: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    }
  },
  mounted () {
    setInterval(this.updateTime, 1000)
  },
  methods: {
    updateTime () {
      const cd = new Date()
      this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2)
      this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + this.week[cd.getDay()]
    },

    zeroPadding (num, digit) {
      let zero = ''
      for (let i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    }
  }
}
</script>

<style scoped>
#clock {
  display: flex;
  gap: 0.5em;
  font-family: 'Share Tech Mono', monospace;
  color: #000000;
  text-align: center;
  text-shadow: 0 0 2px rgba(7, 7, 7, 0.938), 0 0 2px rgba(211, 201, 197, 0);
}

#clock .time {
  letter-spacing: 0.05em;
  font-size: 14px;
  padding: 0;
}

#clock .date {
  letter-spacing: 0.1em;
  font-size: 14px;
  padding: 0;
}
</style>
