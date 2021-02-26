<template>
  <div>
    <h2>新規登録画面</h2>
    <label for="name">ユーザ名</label>
    <input type="text" id="name" v-model="username">
    <br>
    <label for="email">メールアドレス</label>
    <input type="email" id="email" v-model="email">
    <br>
    <label for="password">パスワード</label>
    <input type="password" id="password" v-model="password">
    <br>
    <button @click="signup">新規登録</button>
    <br>
    <router-link to="/">ログインはこちら</router-link>
  </div>
</template>

<script>
// import firebase from '../firebase'
import firebase from 'firebase'

export default {
  data() {
    return {
      email: '',
      password: '',
      username: ''
    }
  },
  methods: {
    signup() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then((response) => {
        response.user.updateProfile({
          displayName: this.username
          });
          this.$router.push('/')
      })
      .catch(error => {
        alert(error.message)
      })
    },
  },
}
</script>
