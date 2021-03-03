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
    <button @click="signUp">新規登録</button>
    <br>
    <router-link to="/">ログインはこちら</router-link>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: '',
      password: '',
      username: ''
    }
  },
  methods: {
    signUp() {
     this.$store.dispatch('signUp', {
       email: this.email,
       password: this.password,
       username: this.username
     })
    },
  },
}
</script>
