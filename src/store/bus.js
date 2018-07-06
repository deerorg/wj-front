import Vue from 'vue'
const bus = new Vue({
  data () {
    return {
      user: {},
      wj: {
        title: '',
        description: '',
        test_questions: [

        ]
      }
    }
  }
})
export default bus
