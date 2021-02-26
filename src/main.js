import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './firebase'
// import firebase from 'firebase'
// import "firebase/auth";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// const config = {
//   apiKey: "AIzaSyDcHXnKBk0YMiPNMqxLapcqVQiOUbg77fQ",
//   authDomain: "vue-money-d498c.firebaseapp.com",
//   projectId: "vue-money-d498c",
//   storageBucket: "vue-money-d498c.appspot.com",
//   messagingSenderId: "65767955736",
//   appId: "1:65767955736:web:516272667c8bc53308d26d",
//   measurementId: "G-EHQXM21E6Y",
//   databaseURL: "https://vue-money-d498c.firebaseio.com"
// }

// firebase.initializeApp(config);
