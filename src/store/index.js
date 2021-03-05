import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    username: '',
    money: '',
    usernames: []
  },
  getters: {
    users: state => state.users,
    money: state => state.money,
    username: state => state.username,
    usernames: state => state.usernames,
  },
  mutations: {
    updateUsers(state, newUser) {
      state.user = newUser
    },
    setMoney(state, newMoney) {
      state.money = newMoney
    },
    setUsername(state, newUsername) {
      state.usernames.push(newUsername)
    },
  },
  actions: {
    signUp(context, { email, password, username }) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(response => {
          response.user.updateProfile({
            displayName: username
          })
          firebase.firestore().collection('users').doc(response.user.uid).set({
            username: username,
            userId: response.user.uid,
            money: 1000
          })
          router.push('/')
        })
        .catch(error => {
          alert(error.message)
        })

    },
    login(context, { email, password }) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          this.email = ''
          this.password = ''
          router.push('money')
        })
        .catch(error => {
          alert(error.message)
        })
    },
    signOut() {
      firebase.auth().signOut()
        .then(() => {
          router.push('/')
        })
    },
    setMoney({ commit }, uid) {
      const doc = firebase.firestore().collection('users').doc(uid).get()
      doc
        .then(response => {
          const newMoney = response.data().money
          commit('setMoney', newMoney)
        })
        .catch(error => {
          alert(error.message)
        })
    },
    setUsername({ commit }) {
      firebase.firestore().collection('users').get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const newUsername = doc.data().username
            commit('setUsername', newUsername)
          })
        })
        .catch(error => {
          alert(error.message)
        })
    }
  },
  modules: {
  }
})
