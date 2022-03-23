import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cursosDB: [],
  },
  mutations: {
    FETCH_CURSOS(state, cursos){
      state.cursosDB = cursos
    }
  },
  actions: {
  },
  modules: {
  }
})
