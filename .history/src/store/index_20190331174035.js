import Vue from 'vue'
import Vuex from 'vuex'
import getter from './getter'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
   

  },
  getter
})

export default store