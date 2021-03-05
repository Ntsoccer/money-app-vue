<template>
  <div>
    <div class="head">
      <p>{{ username }}さんようこそ！</p>
      <p>残高:{{ getMoney }}</p>
      <button @click="signOut">ログアウト</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>ユーザ名</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in getUsers" :key="user">
          <td>{{ user }}</td>
          <td>
            <button @click="isShow = !isShow">walletを見る</button>        
          </td>
          <td>
            <button @click="isDisplay = !isDisplay">送る</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="has-money" v-show="isShow">
      <p>さんの残高</p>
      <p>1000</p>
      <button @click="isShow = !isShow">close</button>
    </div>
    <div class="give-money" v-show="isDisplay">
      <p>あなたの残高</p>
      <p>送る金額</p>
      <input type="text">
      <br>
      <button @click="isDisplay = !isDisplay">送信</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
  data() {
    return {
      username: firebase.auth().currentUser.displayName,
      isShow: false,
      isDisplay: false,
      usernames:[]
    }
  },
  methods: {
    signOut() {
     this.$store.dispatch('signOut')
    },
  },
  computed: {
    getMoney() {
      return this.$store.getters.money
    },
    getUsers() {
      return this.$store.getters.usernames
    }
  },
  created() {
      const user = firebase.auth().currentUser
      this.$store.dispatch('setMoney', user.uid)
      this.$store.dispatch('setUsername')
    },
  mounted() {
  }
}
</script>

<style scoped>
  .head{
    display: flex;
    justify-content: space-between;
  }
  .has-money{
    text-align: center;
  }
</style>