import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '../firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    users: state => state.users
  },
  mutations: {
    updateUsers(state, newUser) {
      state.user = newUser
    }
  },
  actions: {
    signUp(context, { email, password }) {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
    },
    login(context, { email, password }) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
    },
    signOut() {
      return firebase.auth().signOut()
    }
  },
  modules: {
  }
})
