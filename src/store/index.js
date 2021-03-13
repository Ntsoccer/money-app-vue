import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login_user: null,
    username: '',
    money: '',
    usernames: [],
    balanceMoney: [],
    uid: [],
    getMoney: ''
  },
  getters: {
    money: state => state.money,
    username: state => state.username,
    usernames: state => state.usernames,
    balanceMoney: state => state.balanceMoney,
    uid: state => state.uid,
    getMoney: state => state.getMoney
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user
    },
    setMoney(state, newMoney) {
      state.money = newMoney
    },
    setUsername(state, newUsername) {
      state.usernames.push(newUsername)
    },
    updateMoney(state, sentMoney) {
      state.money = state.money - sentMoney
    },
    getMoney(state, { sentMoney, index }) {
      state.balanceMoney[index] = state.balanceMoney[index] + sentMoney
    },
    setBalanceMoney(state, balance) {
      state.balanceMoney.push(balance)
    },
    setUid(state, newUid) {
      state.uid.push(newUid)
    }
  },
  actions: {
    setLoginUser({ commit }, user) {
      commit('setLoginUser', user)
    },
    signUp({ commit }, { email, password, username }) {
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
          commit('setUid', response.user.uid)
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
    setUid({ commit }, uid) {
      firebase.firestore().collection('users').where('userId', '!=', uid).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const newUid = doc.data().userId
            commit('setUid', newUid)
          })
        })
        .catch(error => {
          alert(error.message)
        })
    },
    setUsername({ commit }, uid) {
      firebase.firestore().collection('users').where('userId', '!=', uid).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const newUsername = doc.data().username
            commit('setUsername', newUsername)
          })
        })
        .catch(error => {
          alert(error.message)
        })
    },
    setBalanceMoney({ commit }, uid) {
      firebase.firestore().collection('users').where('userId', '!=', uid).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const balance = doc.data().money
            commit('setBalanceMoney', balance)
          })
        })
        .catch(error => {
          alert(error.message)
        })
    },
    updateMoney({ commit, state }, { uid, sentMoney }) {
      const doc2 = firebase.firestore().collection('users').doc(uid)
      doc2.update({
        money: state.money - sentMoney
      })
      commit('updateMoney', sentMoney)
    },
    getMoney({ state, commit }, { sentMoney, index }) {
      //送金される側
      const receiverId = state.uid[index]
      const receiverDocRef = firebase.firestore().collection('users').doc(receiverId)
      const getMoney = state.balanceMoney[index] + sentMoney
      firebase.firestore().runTransaction(transaction => {
        transaction.update(receiverDocRef, { money: getMoney })
        commit('getMoney', { sentMoney, index })
        return Promise.resolve('transaction complete');
      })
      //送金する側
      const uid = firebase.auth().currentUser.uid
      const sendedMoney = state.money - sentMoney
      const senderDocRef = firebase.firestore().collection('users').doc(uid)
      firebase.firestore().runTransaction(transaction => {
        transaction.update(senderDocRef, { money: sendedMoney })
        commit('updateMoney', sentMoney)
        return Promise.resolve('transaction complete');
      })
    },
  },
  modules: {
  }
})
