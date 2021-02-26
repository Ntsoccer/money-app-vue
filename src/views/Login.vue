<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png">
    <h2>ログイン画面</h2>
    <label for="email">メールアドレス</label>
    <input type="email" id="email" v-model="email">
    <br>
    <label for="password">パスワード</label>
    <input type="password" id="password" v-model="password">
    <br>
    <button @click="login">ログイン</button>
    <br>
    <router-link to="/signup">新規登録はこちら</router-link>
  </div>
</template>

<script>
// import firebase from '../firebase'
import firebase from 'firebase'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login(){
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.$router.push('/money')
      })
      .catch(e => {
        alert(e.message)
      })
      this.email = '';
      this.password = '';
    }
  },
}
</script>
