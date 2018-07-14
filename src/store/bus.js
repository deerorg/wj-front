import Vue from 'vue'
const bus = new Vue({
  data () {
    return {
      user: {},
      wj: {
        id: '',
        status: ''
      }
    }
  }
})
export default bus
