import firebase from 'firebase/app';
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDcHXnKBk0YMiPNMqxLapcqVQiOUbg77fQ",
  authDomain: "vue-money-d498c.firebaseapp.com",
  projectId: "vue-money-d498c",
  storageBucket: "vue-money-d498c.appspot.com",
  messagingSenderId: "65767955736",
  appId: "1:65767955736:web:516272667c8bc53308d26d",
  measurementId: "G-EHQXM21E6Y",
  databaseURL: "https://vue-money-d498c.firebaseio.com"
}

firebase.initializeApp(config)

export default firebase;

// const firebaseApp = firebase.initializeApp({
//   apiKey: "AIzaSyDcHXnKBk0YMiPNMqxLapcqVQiOUbg77fQ",
//   authDomain: "vue-money-d498c.firebaseapp.com",
//   projectId: "vue-money-d498c",
//   storageBucket: "vue-money-d498c.appspot.com",
//   messagingSenderId: "65767955736",
//   appId: "1:65767955736:web:516272667c8bc53308d26d",
//   measurementId: "G-EHQXM21E6Y",
//   databaseURL: "https://vue-money-d498c.firebaseio.com"
// })

// export const db = firebaseApp.firestore();