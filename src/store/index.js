import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
  },
  getters: {
    users: state => state.users
  },
  mutations: {
    updateUsers(state, newUser) {
      state.users.push(newUser)
    }
  },
  actions: {
    updateUsers({ commit }, newUser) {
      commit('updateUsers', newUser)
    }
  },
  modules: {
  }
})
