import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import * as getters from './getters'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  mutations,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
