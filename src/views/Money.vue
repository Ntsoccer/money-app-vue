<template>
  <div>
    <div class="head">
      <p>{{ username }}さんようこそ！</p>
      <p>残高:{{ money }}</p>
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
        <tr v-for="user in getUsers" :key="user" @click = "selectUsername(user)">
          <template v-if = "username !== user">
          <td>{{ user }}</td>    
          <td>
            <button @click="isShow = !isShow;">walletを見る</button>        
          </td>
          <td>
            <button @click="display()">送る</button>
          </td>
          </template>
        </tr>
      </tbody>
    </table>
    <div class = "has-money" v-show = "isShow">
      <p>{{ usernames }}さんの残高</p>
      <p>{{ getMoney }}</p>
      <button @click="isShow = !isShow">close</button>
    </div>
    <div class="give-money" v-show = "isDisplay">
      <p>あなたの残高:{{ money }}</p>
      <p>送る金額</p>
      <input type="text" v-model="sentMoney">
      <br>
      <button @click="display(); updateMoney();">送信</button>
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
      usernames: '',
      sentMoney: '',
    }
  },
  methods: {
    signOut() {
     this.$store.dispatch('signOut')
    },
    setUid() {
      this.$store.commit('setUid')
    },
    selectUsername(user) {
      return this.usernames = user
    },
    updateMoney() {
      const login_user= firebase.auth().currentUser
      this.$store.dispatch('updateMoney', {uid:login_user.uid, sentMoney:this.sentMoney})
      this.$store.dispatch('getMoney', Number(this.sentMoney))
    },
    display() {
      this.isDisplay = !this.isDisplay
    }
  },
  computed: {
    money() {
      return this.$store.getters.money
    },
    getUsers() {
      return this.$store.getters.usernames
    },
    getMoney() {
      return this.$store.getters.getMoney
    }
  },
  created() {
      const user = firebase.auth().currentUser
      this.$store.dispatch('setMoney', user.uid)
      this.$store.dispatch('setUsername')
    },
  mounted() {
  },
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