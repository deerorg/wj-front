import Vue from 'vue'
const bus = new Vue({
  data () {
    return {
      user: {},
      wj: {},
      singleq: 0, // 0为不触发，1为添加，2为修改
      singleque: {}
    }
  }
})
export default bus
