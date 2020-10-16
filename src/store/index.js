import Vue from 'vue'
import Vuex from 'vuex'
import index1 from './modules/index1'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    index1,
  },
  getters
})

export default store